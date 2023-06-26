import { Checkbox, Grid, Button, Note } from '@geist-ui/core'

const CreateSlots = () => {
  return (
    <>
      <Note>It's better to delete previous timeslots to keep database light.</Note>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.log(e.target.dateStart.value, e.target.dateEnd.value, e.target.ttBookingsCheck.checked)
        }}
        className="formDiv"
      >
        <Grid.Container mt={1} gap={2}>
          <Grid xs={24} sm={12}>
            <div className="flexCol">
              <label htmlFor="date">Choose From</label>
              <input type="date" id="dateStart" name="dateStart" value={new Date().toISOString().substring(0, new Date().toISOString().lastIndexOf('T'))} />
            </div>
          </Grid>
          <Grid xs={24} sm={12}>
            <div className="flexCol">
              <label htmlFor="date">Choose To</label>
              <input type="date" id="dateEnd" name="dateEnd" value={new Date().toISOString().substring(0, new Date().toISOString().lastIndexOf('T'))} />
            </div>
          </Grid>
          <Grid xs={24} className="flexCol">
            <Checkbox name="ttBookingsCheck">Keep Time Table bookings intact?</Checkbox>
          </Grid>
          <Grid xs={24}>
            <Button type="secondary" htmlType="submit">
              Create Slots
            </Button>
          </Grid>
        </Grid.Container>
      </form>
      <style jsx>
        {`
          .flexCol {
            display: flex;
            flex-wrap: wrap;
            align-items: left;
            flex-direction: column;
          }
          .flexCol input {
            background: white;
          }
          .flexCol label {
            font-size: 12px;
          }
          .formDiv {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          .formDiv div input {
            color: black;
            padding: 5px;
            border-radius: 5px;
            border: 1px solid black;
          }
        `}
      </style>
    </>
  )
}

export default CreateSlots
