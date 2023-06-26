import { Button, Grid, Select } from '@geist-ui/core'

const ClearSlots = () => {
  const handler = (e) => {
    console.log(e)
  }

  const handler2 = (e) => {
    console.log(e)
  }

  const building = ['Old Academic Block', 'R&D Block', 'Seminar Block']

  const spaces = ['CO1 in Old Academic Block', 'CO2 in Old Academic Block', 'CO3 in Old Academic Block']

  return (
    <>
      <div>
        <form action="" className="formDiv">
          <Grid.Container gap={2} justify="left">
            <Grid>
              <Select placeholder="Choose Building" onChange={handler}>
                {building.map((b) => (
                  <Select.Option key={b} value={b}>
                    {b}
                  </Select.Option>
                ))}
              </Select>
            </Grid>
            <Grid>
              <Select placeholder="Choose Space" onChange={handler2}>
                {spaces.map((s) => (
                  <Select.Option key={s} value={s}>
                    {s}
                  </Select.Option>
                ))}
              </Select>
            </Grid>
          </Grid.Container>
          <Grid.Container mt={1} gap={2} justify="left">
            <Grid>
              <div className="dateDiv">
                <label htmlFor="date">From</label>
                <input type="date" name="dateStart" id="dateStart" />
              </div>
            </Grid>
            <Grid>
              <div className="dateDiv">
                <label htmlFor="date">To</label>
                <input type="date" name="dateEnd" id="dateEnd" />
              </div>
            </Grid>
          </Grid.Container>
          <Button type="secondary" mt={2}>
            Clear Slots
          </Button>
        </form>
      </div>
      <style jsx>{`
        .dateDiv label {
          margin-right: 10px;
        }
        .dateDiv input {
          color: black;
          padding: 5px;
          background: white;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
      `}</style>
    </>
  )
}

export default ClearSlots
