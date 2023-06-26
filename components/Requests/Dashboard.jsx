import { useEffect, useState } from 'react'
import { Note, Text, Grid } from '@geist-ui/core'
import RequestCard from '@/components/Requests/Card'

export default function () {
  const [requests, setRequests] = useState([])
  const statusMap = {
    0: 'Pending',
    1: 'Approved',
    2: 'Rejected',
  }
  const [selectedRequestTab, setSelectedRequestTab] = useState(0)

  const fetchRequests = (typeRequest) => {
    fetch(`/api/requests/handle?get${typeRequest}=true`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // Empty the existing set of requests on component mount
        setRequests([])
        if (res[`${typeRequest}Requests`]) {
          res[`${typeRequest}Requests`].forEach((i) => {
            fetch(`/api/requests/handle?requestID=${i}`, {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
              },
            })
              .then((res) => res.json())
              .then((res) => {
                // Append only if a non-direct booking
                if (res && res['requestObj'] && !res['requestObj']['ifDirect']) {
                  // Append each request as soon as each request object is available
                  setRequests((requests) => [res['requestObj'], ...requests])
                }
              })
              .catch((e) => {
                console.log(e)
              })
          })
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const decision = (val, requestID, note = '') => {
    console.log(val, requestID, note)
    fetch(`/api/requests/handle`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ note, requestID, newStatus: val === 2 ? 'rejected' : 'approved' }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        fetchRequests(statusMap[selectedRequestTab].toLowerCase())
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    fetchRequests(statusMap[selectedRequestTab].toLowerCase())
  }, [])

  const isClash = (status, from, to, date, requestID, i, index) => {
    let clash = false
    if (status === 'pending') {
      // Go over each item and check and verify if the time slot is same for many
      requests.forEach((item) => {
        if (item.status !== 'rejected' && item.dateBookedOn !== requestID && item.dateBookedFor === date && item.startTime <= from && item.endTime >= to) {
          // Store true for all wherever there is a clash in the same timing
          clash = true
          return <RequestCard clash={clash} mt={index === 0 ? 0 : 1} decision={decision} key={`${i.dateBookedOn}_${i.status}`} {...i} />
        }
      })
    }
    return <RequestCard clash={clash} mt={index === 0 ? 0 : 1} decision={decision} key={`${i.dateBookedOn}_${i.status}`} {...i} />
  }

  return (
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
            fetchRequests(statusMap[0].toLowerCase())
          }}
          b={selectedRequestTab === 0}
        >
          Pending
        </Text>
        <Text
          mt={1}
          small={selectedRequestTab !== 1}
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            setSelectedRequestTab(1)
            fetchRequests(statusMap[1].toLowerCase())
          }}
          b={selectedRequestTab === 1}
        >
          Approved
        </Text>
        <Text
          mt={1}
          small={selectedRequestTab !== 2}
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            setSelectedRequestTab(2)
            fetchRequests(statusMap[2].toLowerCase())
          }}
          b={selectedRequestTab === 2}
        >
          Rejected
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
        {requests.length > 0 &&
          requests
            // Lower case match for the "pending" requests
            .filter((item) => !item.ifDirect)
            // Check if the status is same as the tab selected
            .filter((item) => item.status === statusMap[selectedRequestTab].toLowerCase())
            // Sort items based on their dateBookedOn
            .sort((a, b) => (a.dateBookedOn > b.dateBookedOn ? -1 : 1))
            // Check if the item clashes with any other object in the array
            .map((i, index) => isClash(i.status, i.startTime, i.endTime, i.dateBookedFor, i.dateBookedOn, i, index))}
        {requests.length > 0 &&
          // Check if the status is same as the tab selected
          requests.filter((item) => item.status === statusMap[selectedRequestTab].toLowerCase()).length < 1 && (
            // Send note if there are no requests left for the tab selected
            <Note label={false}>No {statusMap[selectedRequestTab]} Requests! 🎉</Note>
          )}
        {requests.length < 1 && <Note label={false}>No {statusMap[selectedRequestTab]} Requests to show!</Note>}
      </Grid>
    </Grid.Container>
  )
}
