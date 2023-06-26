import { adminActions } from '@/lib/admin'
import { bodies } from '@/lib/responses/bodies'
import { getEmail } from '@/lib/user-session/email'

export default async function (req, res) {
  try {
    const userEmail = await getEmail(req, res)
    if (req.method === 'POST') {
      const { username, password } = req.body
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      // In case incorrect format of username
      if (!username || username.length < 1) {
        res.status(400).json({ code: 0, message: '[Username] Incorrect format.' })
        return
      }
      // In case incorrect format of password
      if (!password || password.length < 1) {
        res.status(400).json({ code: 0, message: '[Password] Incorrect format.' })
        return
      }
      // Match the admin credentials from the .env
      let checkMatchCode = username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD ? 1 : 0
      // In case credentials match, set the value of it being in admin true (so that can
      // be used in determining if the user is admin in other API calls on the server side)
      if (checkMatchCode) {
        await adminActions.set(userEmail)
        res.status(200).json({ code: 1 })
        return
      } else {
        res.status(400).json({ code: 0, message: 'Invalid Username OR Password.' })
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
