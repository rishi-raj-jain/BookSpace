import redis from '@/lib/redis'
import { adminActions } from '@/lib/admin'
import { bodies } from '@/lib/responses/bodies'
import { getEmail } from '@/lib/user-session/email'

export default async function (req, res) {
  try {
    const userEmail = await getEmail(req, res)
    // Create a department
    if (req.method === 'POST') {
      const { name } = req.body
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      if (await adminActions.verify(userEmail)) {
        if (!name || name.length < 1) {
          res.status(400).json({ code: 0, message: '[Context Name] Incorrect format.' })
          return
        } else {
          const departmentObj = {
            name,
            createdAt: Date.now(),
          }
          await redis.hset('departments', departmentObj['createdAt'], JSON.stringify(departmentObj))
          res.status(200).json(bodies.ok)
          return
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
