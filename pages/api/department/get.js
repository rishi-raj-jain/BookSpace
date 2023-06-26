import redis from '@/lib/redis'
import { bodies } from '@/lib/responses/bodies'

export default async function (req, res) {
  try {
    // Get all the departments
    if (req.method === 'GET') {
      let Departments = []
      let departments = await redis.hvals('departments')
      departments.forEach((i) => {
        if (i) Departments.push(JSON.parse(i))
      })
      res.status(200).json({ Departments })
      return
    } else {
      res.status(400).json(bodies.invalid)
    }
  } catch (e) {
    console.log(e)
    res.status(400).json(bodies.error)
  }
}
