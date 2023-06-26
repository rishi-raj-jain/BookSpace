import { Button, Input, Spacer, Grid, useToasts } from '@geist-ui/core'

export default function () {
  const { setToast } = useToasts()
  return (
    <form
      id="newForm"
      onSubmit={(e) => {
        e.preventDefault()
        if (e.target.Question.value.length > 2 && e.target.Answer.value.length > 2) {
          fetch(`/api/faq/set`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              question: e.target.Question.value,
              answer: e.target.Answer.value,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res['code'] === 1) {
                setToast({
                  text: 'Successfully Created The FAQ',
                  type: 'success',
                })
                document.getElementById('newForm').reset()
              } else {
                console.log(res)
                setToast({
                  text: 'Error While Creating The FAQ',
                  type: 'warning',
                })
              }
            })
            .catch((e) => {
              console.log(e)
              setToast({
                text: 'Error While Creating The FAQ',
                type: 'warning',
              })
            })
        } else {
          setToast({
            text: 'Please enter valid FAQ details.',
            type: 'error',
          })
        }
      }}
    >
      <Input
        onChange={(val) => {
          console.log(val)
        }}
        w="100%"
        name="Question"
        label="Question"
        placeholder="Enter FAQ Question"
      />
      <Spacer h={1} />
      <Input
        onChange={(val) => {
          console.log(val)
        }}
        w="100%"
        name="Answer"
        label="Answer"
        placeholder="Enter FAQ Answer"
      />
      <Grid.Container mt={1}>
        <Grid>
          <Button htmlType="submit">Create</Button>
        </Grid>
      </Grid.Container>
    </form>
  )
}
