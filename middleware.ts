import { performCors } from '@/lib/cors'
import { NextResponse } from 'next/server'
import type { NextRequest, NextResponse as NextResponseType } from 'next/server'

interface corsResponse extends NextResponseType {
  setHeader?: any
}

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/api/auth')) {
    const response: corsResponse = NextResponse.next()
    response.setHeader = (...args) => response.headers.set(args[0], args[1])
    await performCors(request, response)
    return response
  }
}

export const config = {
  matcher: '/api/:path*',
}
