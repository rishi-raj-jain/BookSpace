import redis from '@/lib/redis'
import { adminActions } from '@/lib/admin'
import { bodies } from '@/lib/responses/bodies'
import { getEmail } from '@/lib/user-session/email'

export default async function (req, res) {
  try {
    const userEmail = await getEmail(req, res)
    // Delete FAQs
    if (req.method === 'DELETE') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      if (await adminActions.verify(userEmail)) {
        const { createdAt } = req.query
        // Delete one FAQ
        if (createdAt) {
          await redis.hdel('faqs', createdAt)
          res.status(200).json(bodies.ok)
        }
        // Delete all FAQs
        else {
          await redis.del('faqs')
          res.status(200).json(bodies.ok)
        }
      } else {
        res.status(400).json(bodies.rest)
        return
      }
    } else {
      console.log(e)
      res.status(400).json(bodies.invalid)
    }
  } catch (e) {
    console.log(e)
    res.status(400).json(bodies.error)
  }
}
