import redis from '@/lib/redis'
import { adminActions } from '@/lib/admin'
import { bodies } from '@/lib/responses/bodies'
import { getEmail } from '@/lib/user-session/email'

export default async function (req, res) {
  try {
    const userEmail = await getEmail(req, res)
    // Create context
    if (req.method === 'POST') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      if (await adminActions.verify(userEmail)) {
        const { name } = req.body
        if (!name || name.length < 1) {
          res.status(400).json({ code: 0, message: '[Context Name] Incorrect format.' })
          return
        } else {
          const contextObj = {
            name,
            createdAt: Date.now(),
          }
          await redis.hset('contexts', contextObj['createdAt'], JSON.stringify(contextObj))
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
