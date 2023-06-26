import { useState } from 'react'
import { Text, Grid } from '@geist-ui/core'
import ClearSlots from '@/components/Slots/Clear'
import CreateSlots from '@/components/Slots/Create'
import ClearAllSlots from '@/components/Slots/ClearAll'

export default function () {
  const [selectedRequestTab, setSelectedRequestTab] = useState(0)
  return (
    <>
      <Grid.Container mb={2} mt={2} gap={2} justify="left">
        <Grid
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          xs={24}
          sm={4}
        >
          <Text
            small={selectedRequestTab !== 0}
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              setSelectedRequestTab(0)
            }}
            b={selectedRequestTab === 0}
          >
            Create Slots
          </Text>
          <Text
            mt={1}
            small={selectedRequestTab !== 1}
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              setSelectedRequestTab(1)
            }}
            b={selectedRequestTab === 1}
          >
            Clear Slots
          </Text>
          <Text
            mt={1}
            small={selectedRequestTab !== 2}
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              setSelectedRequestTab(2)
            }}
            b={selectedRequestTab === 2}
          >
            Clear All Slots
          </Text>
        </Grid>
        <Grid
          xs={24}
          sm={20}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {selectedRequestTab === 0 && <CreateSlots />}
          {selectedRequestTab === 1 && <ClearSlots />}
          {selectedRequestTab === 2 && <ClearAllSlots />}
        </Grid>
      </Grid.Container>
    </>
  )
}
