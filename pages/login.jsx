import Google from '@/components/Shared/Google'
import { getServerSession } from 'next-auth/next'
import { Text, Button, Card } from '@geist-ui/core'
import { getProviders, signIn } from 'next-auth/react'
import { authOptions } from './api/auth/[...nextauth]'

export default function ({ providers }) {
  return (
    <div className="flex min-h-[inherit] w-full flex-col items-center justify-center">
      <Card w="300px">
        <Text className="font-light" font={1} h2>
          Welcome Back
        </Text>
        <Text className="font-medium" font={1.5} h1>
          Sign In To Your Account
        </Text>
        {Object.values(providers).map((provider) => (
          <Button className="!w-full" type="secondary" icon={<Google />} mt={1} key={provider.name} onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </Button>
        ))}
      </Card>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (session) {
    try {
      const tmp = new URL(context.req.headers.referer)
      return { redirect: { destination: tmp.pathname } }
    } catch (e) {
      return { redirect: { destination: '/' } }
    }
  }
  const providers = await getProviders()
  return {
    props: { providers: providers ?? [] },
  }
}
