import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export async function getEmail(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return
  }
  return session.user.email
}

export async function getUsername(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return
  }
  return session.user.name
}

export async function getUserImage(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return
  }
  return session.user.image
}
