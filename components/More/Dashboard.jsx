import { useEffect, useState } from 'react'
import { Button, Note, Spacer, useToasts } from '@geist-ui/core'

export default function () {
  const { setToast } = useToasts()
  const [authUsers, setAuthUsers] = useState([])

  const fetchAdminUsers = () => {
    setAuthUsers([])
    fetch(`/api/admin/get`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res['code'] === 1) {
          setAuthUsers(res['admins'])
        }
      })
  }

  useEffect(() => {
    fetchAdminUsers()
  }, [])

  return (
    <>
      {authUsers.length > 0 ? (
        authUsers.map((i) => (
          <div className="mt-4 flex w-full flex-row items-center justify-between border-b pb-4 dark:border-white/25">
            <span>{i}</span>
            <Button
              onClick={() => {
                fetch(`/api/admin/unset`, {
                  method: 'POST',
                  headers: {
                    'content-type': 'application/json',
                  },
                  body: JSON.stringify({ adminToInvalidate: i }),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res['code'] === 1) {
                      fetchAdminUsers()
                    } else {
                      setToast({
                        text: `Couldn't invalidate the admin user: ${i}`,
                        type: 'error',
                      })
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                    setToast({
                      text: `Couldn't invalidate the admin user: ${i}`,
                      type: 'error',
                    })
                  })
              }}
            >
              Invalidate
            </Button>
          </div>
        ))
      ) : (
        <Note label={false} mt={2}>
          No admin users to show.
        </Note>
      )}
      <Spacer h={4} />
    </>
  )
}
