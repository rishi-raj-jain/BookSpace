import redis from '@/lib/redis'
import { adminActions } from '@/lib/admin'
import { bodies } from '@/lib/responses/bodies'
import { getEmail } from '@/lib/user-session/email'

export default async function (req, res) {
  try {
    const userEmail = await getEmail(req, res)
    // Get all the faqs
    if (req.method === 'POST') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      if (await adminActions.verify(userEmail)) {
        const { question: q, answer: a } = req.body
        if (!q || q.length < 1) {
          res.status(400).json({ code: 0, message: '[Question] Incorrect format.' })
          return
        }
        if (!a || a.length < 1) {
          res.status(400).json({ code: 0, message: '[Answer] Incorrect format.' })
          return
        }
        const faqObj = {
          q,
          a,
          createdAt: Date.now(),
        }
        await redis.hset('faqs', faqObj['createdAt'], JSON.stringify(faqObj))
        res.status(200).json(bodies.ok)
        return
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
