import { Button, Input, Grid, useToasts } from '@geist-ui/core'

const CreateDepartment = () => {
  const { setToast } = useToasts()
  return (
    <form
      id="newForm"
      onSubmit={(e) => {
        e.preventDefault()
        if (e.target.Department.value.length > 2) {
          fetch('/api/department/set', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: e.target.Department.value,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res['code'] === 1) {
                setToast({
                  text: 'Successfully Created The Department',
                  type: 'success',
                })
                document.getElementById('newForm').reset()
              } else {
                console.log(res)
                setToast({
                  text: 'Error While Creating The Department',
                  type: 'warning',
                })
              }
            })
            .catch((e) => {
              console.log(e)
              setToast({
                text: 'Error While Creating The Department',
                type: 'warning',
              })
            })
        } else {
          setToast({
            text: 'Please enter valid Department details.',
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
        name="Department"
        placeholder="Enter Department Name"
      />
      <Grid.Container mt={1}>
        <Grid>
          <Button htmlType="submit">Create</Button>
        </Grid>
      </Grid.Container>
    </form>
  )
}

export default CreateDepartment
