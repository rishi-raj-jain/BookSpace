import redis from '@/lib/redis'
import { adminActions } from '@/lib/admin'
import { bodies } from '@/lib/responses/bodies'
import { getEmail } from '@/lib/user-session/email'

export default async function (req, res) {
  try {
    const userEmail = await getEmail(req, res)
    // Delete department(s)
    if (req.method === 'DELETE') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      if (await adminActions.verify(userEmail)) {
        const { createdAt } = req.query
        // Delete one Department
        if (createdAt) {
          await redis.hdel('departments', createdAt)
          res.status(200).json(bodies.ok)
        }
        // Delete all departments
        else {
          await redis.del('departments')
          res.status(200).json(bodies.ok)
        }
      } else {
        res.status(400).json(bodies.rest)
        return
      }
    } else {
      res.status(400).json(bodies.invalid)
    }
  } catch (e) {
    console.log(e)
    res.status(400).json(bodies.error)
  }
}
