import { useState } from 'react'
import { Button, Input, Grid, useToasts, Checkbox, Text } from '@geist-ui/core'

const CreateSpace = () => {
  const [img, setImg] = useState('')
  const { setToast } = useToasts()
  const [building, setBuilding] = useState('')
  const [selected, setSelected] = useState(false)

  return (
    <form
      id="newForm"
      onSubmit={(e) => {
        e.preventDefault()
        if (e.target.Name.value.length > 2 && e.target['Space Type'].value.length > 2) {
          fetch(`/api/spaces/handle`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: e.target.Name.value,
              capacity: e.target.Capacity.value,
              spaceType: e.target['Space Type'].value,
              ifDirect: selected,
              image: img,
              building: building,
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
                setImg('')
                setSelected(false)
                setBuilding('')
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
        name="Name"
        label="Name"
        placeholder="Enter Space Name"
      />
      <Input
        onChange={(val) => {
          console.log(val)
        }}
        mt={1}
        w="100%"
        name="Capacity"
        label="Capacity"
        placeholder="Enter Space Capacity"
      />
      <Input
        onChange={(val) => {
          console.log(val)
        }}
        mt={1}
        w="100%"
        name="Space Type"
        label="Space Type"
        placeholder="Enter Space Type"
      />
      <Grid.Container gap={2}>
        <Grid xs={24}>
          <Text>Select the building in which this space lies:</Text>
        </Grid>
        <Grid
          onClick={(e) => {
            setImg((img) => (img === '/assets/images/lib.png' ? '' : '/assets/images/lib.png'))
            setBuilding((building) => (building === 'Library' ? '' : 'Library'))
          }}
          style={{
            display: 'flex',
            cursor: 'pointer',
            flexDirection: 'column',
            boxShadow: img === '/assets/images/lib.png' ? '1px 1px 1px 1px #C1C1C1' : '',
          }}
        >
          {/* <Image width={`${1463 * 0.1}px`} height={`${621 * 0.1}px`} src="/assets/images/lib.png" style={{ objectFit: 'contain' }} /> */}
          <Text h5 mt={1} mb={0} p={0}>
            Library
          </Text>
        </Grid>
        <Grid
          onClick={(e) => {
            setImg((img) => (img === '/assets/images/oldacad.png' ? '' : '/assets/images/oldacad.png'))
            setBuilding((building) => (building === 'Old Academic Block' ? '' : 'Old Academic Block'))
          }}
          style={{
            display: 'flex',
            cursor: 'pointer',
            flexDirection: 'column',
            boxShadow: img === '/assets/images/oldacad.png' ? '1px 1px 1px 1px #C1C1C1' : '',
          }}
        >
          {/* <Image width={`${1463 * 0.1}px`} height={`${621 * 0.1}px`} src="/assets/images/oldacad.png" style={{ objectFit: 'contain' }} /> */}
          <Text h5 mt={1} mb={0} p={0}>
            Old Academic Block
          </Text>
        </Grid>
        <Grid
          onClick={(e) => {
            setImg((img) => (img === '/assets/images/seminar.png' ? '' : '/assets/images/seminar.png'))
            setBuilding((building) => (building === 'Seminar Block' ? '' : 'Seminar Block'))
          }}
          style={{
            display: 'flex',
            cursor: 'pointer',
            flexDirection: 'column',
            boxShadow: img === '/assets/images/seminar.png' ? '1px 1px 1px 1px #C1C1C1' : '',
          }}
        >
          {/* <Image width={`${1464 * 0.1}px`} height={`${620 * 0.1}px`} src="/assets/images/seminar.png" style={{ objectFit: 'contain' }} /> */}
          <Text h5 mt={1} mb={0} p={0}>
            Seminar Block
          </Text>
        </Grid>
        <Grid
          onClick={(e) => {
            setImg((img) => (img === '/assets/images/sportsblock.jpeg' ? '' : '/assets/images/sportsblock.jpeg'))
            setBuilding((building) => (building === 'Sports Block' ? '' : 'Sports Block'))
          }}
          style={{
            display: 'flex',
            cursor: 'pointer',
            flexDirection: 'column',
            boxShadow: img === '/assets/images/sportsblock.jpeg' ? '1px 1px 1px 1px #C1C1C1' : '',
          }}
        >
          {/* <Image width={`${1280 * 0.15}px`} height={`${426 * 0.15}px`} style={{ objectFit: 'contain' }} src="/assets/images/sportsblock.jpeg" /> */}
          <Text h5 mt={1} mb={0} p={0}>
            Sports Block
          </Text>
        </Grid>
        <Grid
          onClick={(e) => {
            setImg((img) => (img === '/assets/images/openspaces.png' ? '' : '/assets/images/openspaces.png'))
            setBuilding((building) => (building === 'Open Spaces' ? '' : 'Open Spaces'))
          }}
          style={{
            display: 'flex',
            cursor: 'pointer',
            flexDirection: 'column',
            boxShadow: img === '/assets/images/openspaces.png' ? '1px 1px 1px 1px #C1C1C1' : '',
          }}
        >
          {/* <Image width={`${1280 * 0.15}px`} height={`${426 * 0.15}px`} style={{ objectFit: 'contain' }} src="/assets/images/openspaces.png" /> */}
          <Text h5 mt={1} mb={0} p={0}>
            Open Spaces
          </Text>
        </Grid>
        <Grid
          onClick={(e) => {
            setImg((img) => (img === '/assets/images/fms.png' ? '' : '/assets/images/fms.png'))
            setBuilding((building) => (building === 'FMS' ? '' : 'FMS'))
          }}
          style={{
            display: 'flex',
            cursor: 'pointer',
            flexDirection: 'column',
            boxShadow: img === '/assets/images/fms.png' ? '1px 1px 1px 1px #C1C1C1' : '',
          }}
        >
          {/* <Image width={`${1280 * 0.15}px`} height={`${426 * 0.15}px`} style={{ objectFit: 'contain' }} src="/assets/images/fms.png" /> */}
          <Text h5 mt={1} mb={0} p={0}>
            FMS
          </Text>
        </Grid>
        <Grid
          onClick={(e) => {
            setImg((img) => (img === '/assets/images/newacad.jpeg' ? '' : '/assets/images/newacad.jpeg'))
            setBuilding((building) => (building === 'New Academic Block' ? '' : 'New Academic Block'))
          }}
          style={{
            display: 'flex',
            cursor: 'pointer',
            flexDirection: 'column',
            boxShadow: img === '/assets/images/newacad.jpeg' ? '1px 1px 1px 1px #C1C1C1' : '',
          }}
        >
          {/* <Image width={`${1280 * 0.1}px`} height={`${639 * 0.1}px`} style={{ objectFit: 'contain' }} src="/assets/images/newacad.jpeg" /> */}
          <Text h5 mt={1} mb={0} p={0}>
            R&D Block
          </Text>
        </Grid>
      </Grid.Container>
      <Checkbox
        mt={1.5}
        name="ifDirect"
        label="ifDirect"
        checked={selected}
        onClick={(e) => {
          setSelected((selected) => !selected)
        }}
      >
        Can this space be directly booked?
      </Checkbox>
      <Grid.Container mt={1.5}>
        <Grid>
          <Button htmlType="submit">Create</Button>
        </Grid>
      </Grid.Container>
    </form>
  )
}

export default CreateSpace
