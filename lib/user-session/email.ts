import type { DefaultUser } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

interface User {
  user: DefaultUser
}

export async function getEmail(req, res) {
  const session: User = await getServerSession(req, res, authOptions)
  if (!session) {
    return
  }
  return session.user.email
}

export async function getUsername(req, res) {
  const session: User = await getServerSession(req, res, authOptions)
  if (!session) {
    return
  }
  return session.user.name
}

export async function getUserImage(req, res) {
  const session: User = await getServerSession(req, res, authOptions)
  if (!session) {
    return
  }
  return session.user.image
}
