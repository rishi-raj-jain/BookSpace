import redis from '@/lib/redis'

export const adminActions = {
  verify: async (userEmail) => {
    if (!userEmail || userEmail.length < 1) return false
    return (await redis.hget('auth_lists', userEmail)) === 'admin'
  },
  set: async (userEmail) => {
    await redis.hset('auth_lists', userEmail, 'admin')
  },
  unset: async (userEmail) => {
    await redis.hdel('auth_lists', userEmail)
  },
  get: async () => {
    return await redis.hkeys('auth_lists')
  },
}
