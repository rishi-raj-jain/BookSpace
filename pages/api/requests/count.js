import redis from '@/lib/redis'
import { bodies } from '@/lib/responses/bodies'

export default async function (req, res) {
  try {
    // Get length of all the requests
    if (req.method === 'GET') {
      res.status(200).json({ code: 1, requests: await redis.hlen('requests') })
      return
    } else {
      res.status(400).json(bodies.invalid)
      return
    }
  } catch (e) {
    console.log(e)
    res.status(400).json(bodies.error)
  }
}
