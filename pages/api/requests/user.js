import redis from '@/lib/redis'
import { bodies } from '@/lib/responses/bodies'
import { getEmail } from '@/lib/user-session/email'

export default async function (req, res) {
  try {
    if (req.method === 'GET') {
      const userEmail = await getEmail(req, res)
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      // If valid user, return all the user requests,
      // filter them client side based on ifEvent flag as event
      res.status(200).json({ requests: JSON.parse(await redis.hget(userEmail, 'requests')) })
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
