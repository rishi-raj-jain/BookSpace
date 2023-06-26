import redis from '@/lib/redis'
import { bodies } from '@/lib/responses/bodies'

export default async function (req, res) {
  try {
    // Get all the faqs
    if (req.method === 'GET') {
      let FAQs = await redis.hvals('faqs')
      FAQs.forEach((i, ind) => {
        if (i) FAQs[ind] = JSON.parse(i)
      })
      res.status(200).json({ FAQs })
    } else {
      console.log(e)
      res.status(400).json(bodies.invalid)
    }
  } catch (e) {
    console.log(e)
    res.status(400).json(bodies.error)
  }
}
