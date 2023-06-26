import redis from '@/lib/redis'
import { bodies } from '@/lib/responses/bodies'
import { getEmail } from '@/lib/user-session/email'

export default async function (req, res) {
  try {
    const userEmail = await getEmail(req, res)
    // Create feedback item
    if (req.method === 'POST') {
      const { context, feedback, department } = req.body
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      // If invalid context
      if (!context || context.length < 1) {
        res.status(400).json({ code: 0, message: '[Context Name] Incorrect format.' })
        return
      }
      // If invalid feedback
      if (!feedback || feedback.length < 1) {
        res.status(400).json({ code: 0, message: '[Feedback] Incorrect format.' })
        return
      }
      // If invalid department
      if (!department || department.length < 1) {
        res.status(400).json({ code: 0, message: '[Department Name] Incorrect format.' })
        return
      }
      // Try to parse the values if possible, add the date identifier for display purposes.
      // Store hashes of the feedback so that can be paginated later
      else {
        const feedbackObj = {
          context,
          feedback,
          department,
          userEmail,
          createdAt: Date.now(),
        }
        // START: Populate the global feedbacks array for easier admin access
        await redis.hset('feedbacks', feedbackObj['createdAt'], JSON.stringify(feedbackObj))
        await redis.hset('feedbacksHashes', feedbackObj['createdAt'], feedbackObj['createdAt'])
        // END: Populate the global feedbacks array for easier admin access
        // START: Populate the user feedbacks for easier user access
        let temp = []
        let existingFeedbacks = JSON.parse(await redis.hget(userEmail, 'feedbacks'))
        if (existingFeedbacks) {
          temp = [...existingFeedbacks, JSON.stringify(feedbackObj)]
        }
        await redis.hset(userEmail, 'feedbacks', JSON.stringify(temp))
        // END: Populate the user feedbacks for easier access
        res.status(200).json(bodies.ok)
        return
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
