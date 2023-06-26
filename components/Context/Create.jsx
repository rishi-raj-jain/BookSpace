import { Button, Input, Spacer, Grid, useToasts } from '@geist-ui/core'

const CreateContext = () => {
  const { setToast } = useToasts()
  return (
    <form
      id="newForm"
      onSubmit={(e) => {
        e.preventDefault()
        if (e.target.Context.value.length > 2) {
          fetch(`/api/context/set`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: e.target.Context.value,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res['code'] === 1) {
                setToast({
                  text: 'Successfully Created The Context',
                  type: 'success',
                })
                document.getElementById('newForm').reset()
              } else {
                console.log(res)
                setToast({
                  text: 'Error While Creating The Context',
                  type: 'warning',
                })
              }
            })
            .catch((e) => {
              console.log(e)
              setToast({
                text: 'Error While Creating The Context',
                type: 'warning',
              })
            })
        } else {
          setToast({
            text: 'Please enter valid Context details.',
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
        label="Name"
        name="Context"
        placeholder="Enter Context Name"
      />
      <Grid.Container mt={1}>
        <Grid>
          <Button htmlType="submit">Create</Button>
        </Grid>
      </Grid.Container>
    </form>
  )
}

export default CreateContext
