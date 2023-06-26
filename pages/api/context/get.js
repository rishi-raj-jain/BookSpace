import redis from '@/lib/redis'
import { bodies } from '@/lib/responses/bodies'

export default async function (req, res) {
  try {
    // Get all the contexts
    if (req.method === 'GET') {
      let Contexts = []
      let contexts = await redis.hvals('contexts')
      contexts.forEach((i) => {
        if (i) Contexts.push(JSON.parse(i))
      })
      res.status(200).json({ Contexts })
    } else {
      res.status(400).json(bodies.invalid)
    }
  } catch (e) {
    console.log(e)
    res.status(400).json(bodies.error)
  }
}
