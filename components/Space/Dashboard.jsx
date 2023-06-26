import { useState } from 'react'
import { Grid, Text } from '@geist-ui/core'
import Space from '@/components/Space/Space'
import CreateSpace from '@/components/Space/Create'

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
            Create Space
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
            View Spaces
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
          {selectedRequestTab === 0 && <CreateSpace />}
          {selectedRequestTab === 1 && <Space />}
        </Grid>
      </Grid.Container>
    </>
  )
}
