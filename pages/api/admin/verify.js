import { adminActions } from '@/lib/admin'
import { bodies } from '@/lib/responses/bodies'
import { getEmail } from '@/lib/user-session/email'

export default async function (req, res) {
  try {
    const userEmail = await getEmail(req, res)
    if (req.method === 'GET') {
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      if (await adminActions.verify(userEmail)) {
        res.status(200).json(bodies.ok)
        return
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
