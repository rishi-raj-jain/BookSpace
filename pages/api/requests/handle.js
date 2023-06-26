import redis from '@/lib/redis'
import { adminActions } from '@/lib/admin'
import { getStringDate } from '@/lib/helper'
import { bodies } from '@/lib/responses/bodies'
import { getEmail } from '@/lib/user-session/email'

const requestType = {
  0: 'pending',
  1: 'approved',
  2: 'rejected',
}

export default async function (req, res) {
  try {
    const userEmail = await getEmail(req, res)
    // Get all the type of requests
    if (req.method === 'GET') {
      const { requestID, getpending, getapproved, getrejected } = req.query
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      // Admin scope
      if (await adminActions.verify(userEmail)) {
        // If the request is to get all the pending requests
        if (getpending === 'true') {
          res.status(200).json({ code: 1, pendingRequests: await redis.hvals('pendingRequestHashes') })
          return
        }
        // If the request is to get all the approved requests
        else if (getapproved === 'true') {
          res.status(200).json({ code: 1, approvedRequests: await redis.hvals('approvedRequestHashes') })
          return
        }
        // If the request is to get all the rejected requests
        else if (getrejected === 'true') {
          res.status(200).json({ code: 1, rejectedRequests: await redis.hvals('rejectedRequestHashes') })
          return
        }
        // If the request is to get a specific request object (that can be anything in case of admin)
        else if (requestID) {
          let requestObj = JSON.parse(await redis.hget('requests', requestID))
          res.status(requestObj ? 200 : 400).json(requestObj ? { code: 1, requestObj } : bodies.error)
          return
        }
        // If none of the above
        else {
          res.status(400).json(bodies.rest)
          return
        }
      }
      // If it's not an admin user requesting the requests, limit to normal user scope
      else {
        let RequestHashes = JSON.parse(await redis.hget(userEmail, 'requests'))
        // console.log(RequestHashes)
        // If it's a specific requestID being asked for
        if (requestID) {
          let requestObj = JSON.parse(await redis.hget('requests', requestID))
          res.status(requestObj ? 200 : 400).json(requestObj ? { code: 1, requestObj } : bodies.error)
          return
        }
        // List of requests to be returned for the particular user
        let Requests = []
        RequestHashes.sort((a, b) => new Number(b) - new Number(a))
        // Go over each set of pending requests and then return them, appended
        for (let i in RequestHashes) {
          let temp = RequestHashes[i]
          if (temp) {
            Requests.push(JSON.parse(await redis.hget('requests', temp)))
          }
        }
        res.status(200).json({ code: 1, Requests })
        return
      }
    }
    // Add Upcoming Requests
    else if (req.method === 'POST') {
      const userEmail = await getEmail(req, res)
      const {
        // space name
        spaceName,
        // slot timings
        startTime,
        endTime,
        dateBookedFor,
        // request particular
        calendarKey,
        reminderDuration,
        ifEvent,
        ifBookmark,
        remarks,
        // if eventDetals
        eventTitle,
        eventDesc,
        eventHashtags,
      } = req.body

      // Create the request object
      const requestObj = {
        userEmail,
        spaceName,
        startTime,
        endTime,
        dateBookedFor,
        calendarKey,
        ifBookmark,
        reminderDuration,
        ifEvent,
        eventTitle,
        eventDesc,
        eventHashtags,
        status: requestType[0], // say pending by default
        remarks, // admin side remarks
        dateBookedOn: Date.now(),
      }

      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }

      // In case ifBookmark or ifEvent aren't boolean
      if (!(typeof ifBookmark === 'boolean' || typeof ifEvent === 'boolean')) {
        res.status(400).json({ code: 0, message: '[Boolean] Please send ifEvent and ifBookmark as booleans.' })
        return
      }

      // In case it's an event and no title or hashtags are present
      if (ifEvent && (!eventHashtags || !eventTitle)) {
        res.status(400).json({ code: 0, message: '[Event] Please send title and hashtags with the event details.' })
        return
      }

      // In case no reason for request/event booking is present
      if (requestObj['eventDesc'].length < 1) {
        res.status(400).json({ code: 0, message: '[Request] Please send request reason.' })
        return
      }

      let nextStartHour = undefined,
        nextStartMinutes = undefined

      // Start time processing
      if (requestObj['startTime'].length > 1) {
        // e.g.: 2022-04-08 less than new Date() can't be booked for the past
        if (new Date(`${requestObj['dateBookedFor']} ${requestObj['startTime'].replace('_', ':')}`) < new Date()) {
          res.status(400).json({ code: 0, message: '[Request] Please send date ahead of current time.' })
          return
        }
        let tempArr = requestObj['startTime'].split('_')
        try {
          // Check for hours, restricts slots to 0: till 23:
          let tempParsedHours = parseInt(tempArr[0])
          if (tempParsedHours < 0 || tempParsedHours >= 24) {
            res.status(400).json({ code: 0, message: '[Request] Please send hours in maximum of 24 hours.' })
            return
          }
          // Check for minutes, restricts slots to :00 or :30
          let tempParsedMins = parseInt(tempArr[1])
          if (tempParsedMins != 0 && tempParsedMins != 30) {
            res.status(400).json({ code: 0, message: '[Request] Please send minutes either in 0 or 30 value.' })
            return
          }
          // If the start time ends with 0 minutes, then the next only valid slot would be 30 mins after
          if (tempParsedMins === 0) {
            nextStartHour = tempParsedHours
            nextStartMinutes = 30
          }
          // If the start time ends with 30 minutes, then the next only valid slot would be the one at
          // 30 mins after, ending with 0
          // Convert to 24 hour format
          else {
            nextStartHour = (tempParsedHours + 1) % 24
            nextStartMinutes = 0
          }
        } catch {
          res.status(400).json({ code: 0, message: '[Request] Error occured while parsing startTime.' })
          return
        }
      } else {
        res.status(400).json({ code: 0, message: '[startTime] Incorrect format.' })
        return
      }

      // End time processing
      if (requestObj['endTime'].length > 1) {
        let tempArr = requestObj['endTime'].split('_')
        try {
          // Check for hours, restricts slots to 0: till 23:
          let tempParsedHours = parseInt(tempArr[0])
          if (tempParsedHours < 0 || tempParsedHours >= 24) {
            res.status(400).json({ code: 0, message: '[Request] Please send hours in maximum of 24 hours.' })
            return
          }
          if (tempParsedHours !== nextStartHour) {
            res.status(400).json({ code: 0, message: '[Request] Only valid booking is next 30 minutes from the startTime.' })
            return
          }
          // Check for minutes, restricts slots to :00 or :30
          let tempParsedMins = parseInt(tempArr[1])
          if (tempParsedMins != 0 && tempParsedMins != 30) {
            res.status(400).json({ code: 0, message: '[Request] Please send minutes either in 0 or 30 value.' })
            return
          }
          if (tempParsedMins !== nextStartMinutes) {
            res.status(400).json({ code: 0, message: '[Request] Only valid booking is next 30 minutes from the startTime.' })
            return
          }
        } catch {
          res.status(400).json({ code: 0, message: '[Request] Error occured while parsing endTime.' })
          return
        }
      } else {
        res.status(400).json({ code: 0, message: '[endTime] Incorrect Format.' })
        return
      }

      // Add to the bookmark queue and then cronjob over it
      if (ifBookmark) {
        await redis.hset('bookmarkRequestHashes', requestObj['dateBookedOn'], requestObj['dateBookedOn'])
      }
      // Check if it's just a slot request
      else {
        const spaceObj = JSON.parse(await redis.hget('spaces', spaceName))
        const timeSlotObj = JSON.parse(
          await redis.hget(`${spaceObj['name']}_timeslots`, `${getStringDate(requestObj['dateBookedFor'])}_${requestObj['startTime']}_${requestObj['endTime']}`)
        )

        // If the requests slot exists, do nothing
        if (timeSlotObj) {
        }

        // Create request as it doesn't exist
        else {
          await redis.hset(
            `${spaceObj['name']}_timeslots`,
            `${getStringDate(requestObj['dateBookedFor'])}_${requestObj['startTime']}_${requestObj['endTime']}`,
            JSON.stringify({
              booked: false,
              ifTimeTable: false,
            })
          )
        }

        // Reflect if this request does(not) require admin's approval
        requestObj['ifDirect'] = spaceObj['ifDirect']

        // Set this request to the pendingRequestHashes, have to remove this once the status is updated
        await redis.hset('pendingRequestHashes', requestObj['dateBookedOn'], requestObj['dateBookedOn'])
      }

      // Set this request to the users' requests, have to update this once the status is updated
      let existingUserRequests = JSON.parse(await redis.hget(userEmail, 'requests'))
      if (existingUserRequests) {
        existingUserRequests.push(requestObj['dateBookedOn'])
        await redis.hset(userEmail, 'requests', JSON.stringify(existingUserRequests))
      } else {
        // Set the user's requests'
        let arr = []
        arr.push(requestObj['dateBookedOn'])
        await redis.hset(userEmail, 'requests', JSON.stringify(arr))
      }

      // If it's an event, add to the eventPendingQueue
      if (ifEvent) {
        await redis.hset('eventRequestHashes', requestObj['dateBookedOn'], requestObj['dateBookedOn'])
      }

      // By default add this to the pending requests
      await redis.hset('requests', requestObj['dateBookedOn'], JSON.stringify(requestObj))

      res.status(200).json(bodies.ok)
    }

    // Update request obj
    else if (req.method === 'PUT') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      if (await adminActions.verify(userEmail)) {
        const { requestID, note, newStatus, ifTimeTable } = req.body
        if (requestID) {
          // Update the request with the new status, and add note if available
          let existingRequestObj = JSON.parse(await redis.hget('requests', requestID))
          existingRequestObj['status'] = newStatus

          // Update the request in set of timelots if it's approved
          // If the slot doesn't exist, assume that it's not booked
          // If the slot exists, look for either ifTimeTable or booked boolean(s)
          let bookedTimeSlotObject = { booked: newStatus === 'approved', ifTimeTable: ifTimeTable === true }

          let timeSlotCollectionName = `${existingRequestObj['spaceName']}_timeslots`
          let timeSlotKey = `${getStringDate(existingRequestObj['dateBookedFor'])}_${existingRequestObj['startTime']}_${existingRequestObj['endTime']}`

          // console.log(timeSlotCollectionName, timeSlotKey, JSON.stringify(bookedTimeSlotObject))

          // Set the timeslot with whatever the value
          await redis.hset(timeSlotCollectionName, timeSlotKey, JSON.stringify(bookedTimeSlotObject))
          // If an event is rejected, remove it from the event request hashes
          if (existingRequestObj['ifEvent'] && existingRequestObj['status'] === 'rejected') {
            await redis.hdel('eventRequestHashes', requestID)
          }
          if (note && note.length > 0) {
            existingRequestObj['remarks'] = note
          }
          // Update the request object
          await redis.hset('requests', requestID, JSON.stringify(existingRequestObj))
          // Remove the request from the pendingRequestHashes queue
          await redis.hdel('pendingRequestHashes', requestID)
          // Add to the specific queue based on the newStatus
          await redis.hset(`${newStatus}RequestHashes`, requestID, requestID)
          res.status(200).json(bodies.ok)
          return
        } else {
          res.status(400).json(bodies.rest)
          return
        }
      } else {
        res.status(400).json(bodies.rest)
        return
      }
    }
    // Delete Request(s)
    else if (req.method === 'DELETE') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      if (await adminActions.verify(userEmail)) {
        const { createdAt } = req.query
        // Delete one FAQ
        if (createdAt) {
          await redis.hdel('requests', createdAt)
          res.status(200).json(bodies.ok)
          return
        } else {
          res.status(400).json(bodies.rest)
          return
        }
      }
    } else {
      res.status(400).json(bodies.invalid)
      return
    }
  } catch (e) {
    console.log(e)
    res.status(400).json(bodies.error)
    return
  }
}
