import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Popover, Divider, Button } from '@geist-ui/core'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function () {
  const router = useRouter()
  const { pathname } = router
  const { data: session } = useSession()
  const [admin, setAdmin] = useState(false)
  useEffect(() => {
    fetch('/api/admin/verify')
      .then((res) => res.json())
      .then((res) => {
        if (res && res.code && res.code === 1) {
          setAdmin(true)
        }
      })
  }, [])
  return (
    <div className="flex min-w-[150px] flex-col">
      {session && (
        <>
          <Popover.Item>
            <div className="flex w-full flex-col space-y-2">
              <span className="font-semibold">{session.user.name}</span>
              <span>{session.user.email}</span>
            </div>
          </Popover.Item>
          <Divider />
        </>
      )}
      {pathname !== '/' ? (
        <>
          <Popover.Item
            className="flex flex-row gap-x-3"
            onClick={() => {
              router.push('/')
            }}
          >
            <span>Home</span>
          </Popover.Item>
          <Divider />
        </>
      ) : (
        <></>
      )}
      {session ? (
        <>
          <Popover.Item
            onClick={() => {
              router.push('/dashboard')
            }}
          >
            My Dashboard
          </Popover.Item>
          <Popover.Item
            onClick={() => {
              fetch('/api/admin/unset', {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                },
                body: JSON.stringify({ adminToInvalidate: session.user.email }),
              })
              signOut()
            }}
          >
            Sign Out
          </Popover.Item>
        </>
      ) : (
        <Button onClick={signIn}>Sign In</Button>
      )}
      {session && (
        <>
          <Divider />
          {admin && (
            <Popover.Item
              onClick={() => {
                router.push('/admin')
              }}
            >
              Admin Dashboard
            </Popover.Item>
          )}
          <Popover.Item
            onClick={() => {
              if (admin) {
                fetch(`/api/admin/unset`, {
                  method: 'POST',
                  headers: {
                    'content-type': 'application/json',
                  },
                  body: JSON.stringify({ adminToInvalidate: session.user.email }),
                })
                  .then(() => {
                    router.push('/')
                  })
                  .catch((e) => {
                    console.log(e)
                    router.push('/')
                  })
              } else {
                router.push('/admin/login')
              }
            }}
          >
            Admin {admin ? 'Sign Out' : 'Sign In'}
          </Popover.Item>
        </>
      )}
    </div>
  )
}
