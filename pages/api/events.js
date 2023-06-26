import redis from '@/lib/redis'
import { bodies } from '@/lib/responses/bodies'
import { getEmail } from '@/lib/user-session/email'

export default async function (req, res) {
  try {
    const userEmail = await getEmail(req, res)
    // Get all the departments
    if (req.method === 'GET') {
      const { scope } = req.query
      // If requested all the events
      if (scope === 'all') {
        res.status(200).json({ requests: await redis.hkeys('eventRequestHashes') })
      }
      // Send all user requests
      else {
        let RequestHashes = JSON.parse(await redis.hget(userEmail, 'requests'))
        // List of requests to be returned for the particular user
        let requests = []
        RequestHashes.sort((a, b) => new Number(b) - new Number(a))
        // Go over each set of pending requests and then return them, appended
        for (let i in RequestHashes) {
          let temp = RequestHashes[i]
          if (temp) {
            requests.push(JSON.parse(await redis.hget('requests', temp)))
          }
        }
        res.status(200).json({ code: 1, requests })
      }
      return
    } else {
      res.status(400).json(bodies.invalid)
    }
  } catch (e) {
    console.log(e)
    res.status(400).json(bodies.error)
  }
}
