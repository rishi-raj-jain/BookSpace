import redis from '@/lib/redis'
import { adminActions } from '@/lib/admin'
import { bodies } from '@/lib/responses/bodies'
import { getEmail } from '@/lib/user-session/email'

export default async function (req, res) {
  try {
    const userEmail = await getEmail(req, res)
    // Delete feedback item
    if (req.method === 'DELETE') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      // Allow delete if only admin
      if (await adminActions.verify(userEmail)) {
        const { createdAt } = req.query
        // Delete a particular feedback
        if (createdAt) {
          await redis.hdel('feedbacks', createdAt)
          await redis.hdel('feedbacksHashes', createdAt)
          res.status(200).json(bodies.ok)
          return
        }
        // Delete all feedbacks
        else {
          await redis.del('feedbacks')
          await redis.del('feedbacksHashes')
          res.status(200).json(bodies.ok)
          return
        }
      } else {
        res.status(400).json(bodies.rest)
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
