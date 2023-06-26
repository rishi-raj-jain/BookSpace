import { adminActions } from '@/lib/admin'
import { bodies } from '@/lib/responses/bodies'
import { getEmail } from '@/lib/user-session/email'

export default async function (req, res) {
  try {
    const userEmail = await getEmail(req, res)
    if (req.method === 'GET') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      // Match the admin credentials from the .env
      // Check if the user invalidating is first the admin itself
      // In case credentials match, set the value of it being in admin true
      // Succesfully determined the user to be admin, now send the list of active admins
      if (await adminActions.verify(userEmail)) {
        let admins = await adminActions.get()
        res.status(200).json({ code: 1, admins })
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
