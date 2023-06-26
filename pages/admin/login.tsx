import { useState } from 'react'
import { useRouter } from 'next/router'
import { Key, LogIn, User } from '@geist-ui/icons'
import { Button, Card, Input, Spacer, Text, useToasts } from '@geist-ui/core'

export default function () {
  const router = useRouter()
  const { setToast } = useToasts()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginCall = async () => {
    const if_username = username && username.length > 0
    const if_password = password && password.length > 0

    if (if_username && if_password) {
      fetch('/api/admin/set', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res['code'] === 1) {
            setToast({
              text: 'Logging In...',
              type: 'success',
            })
            router.push('/admin')
          } else {
            setToast({
              text: "Couldn't log you in, invalid Auth details.",
              type: 'error',
            })
          }
        })
    } else if (!if_username) {
      setToast({
        text: 'Please enter valid admin username',
        type: 'error',
      })
    } else if (!if_password) {
      setToast({
        text: 'Please enter valid admin password',
        type: 'error',
      })
    }
  }

  return (
    <div className="flex min-h-[inherit] w-full flex-col items-center justify-center">
      <Card w="300px">
        <Text className="font-light" font={1} h2>
          Welcome, Admin!
        </Text>
        <Text className="font-medium" font={1.5} h1>
          Sign In To Your Account
        </Text>
        <Input mt={1} w="100%" clearable icon={<User />} value={username} placeholder="Admin Username" onChange={(e) => setUsername(e.target.value)} />
        <Spacer h={1} />
        <Input.Password w="100%" value={password} onChange={(e) => setPassword(e.target.value)} icon={<Key />} placeholder="Admin Password" />
        <Spacer h={1} />
        <Button className="!w-full" icon={<LogIn />} type="secondary" onClick={loginCall}>
          Login
        </Button>
      </Card>
    </div>
  )
}
