import { useState } from 'react'
import styles from './Card.module.css'
import { Button, Card, Grid, Textarea, Modal, Text, useModal } from '@geist-ui/core'
import { Calendar, CheckInCircle, Clock, Compass, Info, Slash } from '@geist-ui/icons'

const RequestCard = ({
  mt,
  decision,
  title,
  spaceName: space,
  dateBookedOn: requestID,
  startTime: from,
  endTime: to,
  dateBookedFor: date,
  ifEvent: event,
  eventDesc: reason,
  status,
  clash,
}) => {
  const [note, setNote] = useState('')
  const { visible, setVisible, bindings } = useModal()
  const [initalReason, setInitialReason] = useState(reason.substring(0, 50))

  const statusColor = () => {
    if (status === 'Approved') {
      return (
        <Text className={styles.statusText}>
          <CheckInCircle className={styles.approved} /> Approved
        </Text>
      )
    } else if (status === 'Rejected') {
      return (
        <Text className={styles.statusText}>
          <Slash className={styles.rejected} /> Rejected
        </Text>
      )
    } else if (status === 'Pending') {
      return (
        <Text className={styles.statusText}>
          <Info className={styles.pending} /> Pending
        </Text>
      )
    }
  }

  const isClashing = () => {
    if (clash) {
      return <Text type="warning">Clashing</Text>
    }
  }

  const toggleReason = () => {
    setInitialReason((initalReason) => (reason.length === initalReason.length ? reason.substring(0, 50) : reason))
  }

  return (
    <>
      <Card mt={mt} shadow p={0} m={0}>
        <Text m={0} p={0} h3>
          {`#${requestID} ${title ? ': ' + title : ''}`}
        </Text>
        <Grid.Container gap={2}>
          <Grid>
            <div className={styles.tags}>
              <Calendar size={20} /> &nbsp; {date}
            </div>
          </Grid>
          <Grid>
            <div className={styles.tags}>
              <Clock size={20} /> &nbsp; {from.replace('_', ':')} - {to.replace('_', ':')}
            </div>
          </Grid>
          <Grid>
            <div className={styles.tags}>
              <Compass size={20} /> &nbsp; {space}
            </div>
          </Grid>
        </Grid.Container>
        {isClashing()}
        <Text mt={1}>
          <b>Event: </b> {event ? 'Yes' : 'No'}
        </Text>
        <Text>
          <b>Reason: </b> {initalReason}
          <a
            onClick={(e) => {
              e.preventDefault()
              console.log(1)
              toggleReason()
            }}
          >
            <span style={{ fontSize: '15px', marginLeft: '10px' }}>{reason.length === initalReason.length ? 'Less' : 'More'}</span>
          </a>
        </Text>
        <Grid.Container gap={2}>
          <Grid>
            {status === 'pending' && (
              <Button
                type="success"
                onClick={() => {
                  decision(1, requestID)
                }}
              >
                Approve
              </Button>
            )}
          </Grid>
          <Grid>
            {status === 'pending' && (
              <Button
                type="error"
                onClick={() => {
                  setVisible(true)
                }}
              >
                Reject
              </Button>
            )}
          </Grid>
        </Grid.Container>
      </Card>
      <Modal {...bindings}>
        <Modal.Title font={1}>Reject #{requestID}?</Modal.Title>
        <Modal.Content style={{ display: 'flex', flexDirection: 'column' }}>
          <Text small type={note.length < 1 ? 'error' : 'default'}>
            Reason For Rejection*
          </Text>
          <Textarea value={note} onChange={(e) => setNote(e.target.value)} mt={0.5} placeholder="Note" width="100%" />
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action
          onClick={() => {
            if (note.length < 1) return
            decision(2, requestID, note)
          }}
        >
          Reject
        </Modal.Action>
      </Modal>
    </>
  )
}

export default RequestCard
