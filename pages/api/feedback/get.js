import redis from '@/lib/redis'
import { adminActions } from '@/lib/admin'
import { bodies } from '@/lib/responses/bodies'
import { getEmail } from '@/lib/user-session/email'

export default async function (req, res) {
  try {
    const userEmail = await getEmail(req, res)
    // Read feedback item
    if (req.method === 'GET') {
      const { ifHash, userEmail: requestedUserEmail, page = 0 } = req.query
      let feedbacksHashes = []
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      // Return the feedbacksHashes
      if (ifHash) {
        feedbacksHashes = await redis.hvals('feedbacksHashes')
        res.status(200).json({ feedbacksHashes })
        return
      }
      // Return the feedback items
      else {
        let feedbacks = []
        // Check if a user requested this first
        if (requestedUserEmail && requestedUserEmail.length > 1 && requestedUserEmail === userEmail) {
          // Fetch all the feedbacks from the given id and dump
          feedbacks = JSON.parse(await redis.hget(userEmail, 'feedbacks'))
          res.status(200).json({ feedbacks })
          return
        }
        // Fallback check to the user being admin itself
        else if (await adminActions.verify(userEmail)) {
          // Get all the hashes
          feedbacksHashes = await redis.hvals('feedbacksHashes')
          // Sort in descending order
          feedbacksHashes.sort((a, b) => new Number(b) - new Number(a))
          // Paginate the feedbacks
          let parsedPage = parseInt(page)
          let filteredFeedbackHashes = feedbacksHashes.filter((i, index) => index >= parsedPage * 5 && index < (parsedPage + 1) * 5)
          // Convert into JSON
          for (let i in filteredFeedbackHashes) {
            let temp = filteredFeedbackHashes[i]
            if (temp) {
              feedbacks.push(JSON.parse(await redis.hget('feedbacks', temp)))
            }
          }
          res.status(200).json({ feedbacks })
          return
        }
        // No valid user case is present, send nothing
        else {
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
