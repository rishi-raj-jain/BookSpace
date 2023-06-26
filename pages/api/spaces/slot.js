import redis from '@/lib/redis'
import { getStringDate } from '@/lib/helper'
import { bodies } from '@/lib/responses/bodies'
import { getEmail } from '@/lib/user-session/email'

export default async function (req, res) {
  try {
    if (req.method === 'POST') {
      const userEmail = await getEmail(req, res)
      const { spaceName, dateBookedFor, startTime, endTime } = req.body
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      const timeSlotObj = JSON.parse(await redis.hget(`${spaceName}_timeslots`, `${getStringDate(dateBookedFor)}_${startTime}_${endTime}`))
      res.status(200).json({ timeSlotObj })
      return
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
