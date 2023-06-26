import { Button, Card, useToasts } from '@geist-ui/core'
import { Calendar, Check, QuestionCircle } from '@geist-ui/icons'

export default function ({ getData, a, q, createdAt }) {
  const { setToast } = useToasts()
  return (
    <>
      <Card mb={1} hoverable>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row items-center gap-x-3">
            <QuestionCircle className="h-[18px] w-[18px]" />
            <span>{q}</span>
          </div>
          <div className="flex flex-row items-start gap-x-3">
            <Check className="mt-1 h-auto min-w-[1rem]" />
            <span>{a}</span>
          </div>
          {createdAt && (
            <div className="flex flex-row items-start gap-x-3">
              <Calendar className="mt-1 h-[16px] w-[16px]" />
              <span>{`${new Date(createdAt).toDateString()} ${new Date(createdAt).getHours()}:${new Date(createdAt).getMinutes()}`}</span>
            </div>
          )}
          <Button
            auto
            className="!w-[150px]"
            onClick={() => {
              fetch(`/api/faq/del?createdAt=${createdAt}`, { method: 'DELETE' })
                .then((res) => res.json())
                .then((res) => {
                  if (res['code'] === 1) {
                    setToast({
                      type: 'success',
                      text: 'Successfully Deleted',
                    })
                    getData(true)
                  } else {
                    console.log(res)
                    setToast({
                      type: 'warning',
                      text: 'Error While Deleting',
                    })
                  }
                })
                .catch((e) => {
                  console.log(e)
                  setToast({
                    type: 'warning',
                    text: 'Error While Deleting',
                  })
                })
            }}
          >
            Delete
          </Button>
        </div>
      </Card>
    </>
  )
}
