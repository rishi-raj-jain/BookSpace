import FeedbackCard from './Card'
import { useEffect, useState } from 'react'
import { Note, Button, Spacer, Grid, Modal, useModal, useToasts } from '@geist-ui/core'

export default function () {
  const { setToast } = useToasts()
  const [page, setPage] = useState(0)
  const [data, setData] = useState([])
  const [end, setEnd] = useState(false)
  const { visible, setVisible, bindings } = useModal()

  const getData = (scratch = false) => {
    fetch(`/api/feedback/get?page=${page}&userEmail=admin`)
      .then((res) => res.json())
      .then((res) => {
        if (res.feedbacks.length < 5) {
          setEnd(true)
        }
        if (scratch) {
          setData(res.feedbacks)
        } else {
          setData((data) => [...data, ...res.feedbacks])
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getData()
  }, [page])

  return (
    <>
      {data.length > 0 &&
        data.map((item) => {
          return <FeedbackCard key={item?.createdAt} {...item} getData={getData} />
        })}
      {data.length < 1 && (
        <Note mt={2} label={false}>
          No feedbacks to show.
        </Note>
      )}
      {data.length > 0 && (
        <Grid.Container mt={1} gap={2}>
          {!end && (
            <Grid>
              <Button
                onClick={(e) => {
                  setPage((page) => page + 1)
                }}
              >
                View More &darr;
              </Button>
            </Grid>
          )}
          <Grid>
            <Button
              type="error"
              onClick={(e) => {
                setVisible(true)
              }}
            >
              Clear All Feedbacks
            </Button>
          </Grid>
        </Grid.Container>
      )}
      <Spacer h={2} />
      <Modal {...bindings}>
        <Modal.Title font={0.8}>Are you sure you want to clear all feedbacks?</Modal.Title>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action
          onClick={(e) => {
            fetch('/api/feedback/del', {
              method: 'DELETE',
            })
              .then((res) => res.json())
              .then((res) => {
                if (res['code'] === 1) {
                  setToast({
                    text: 'Successfully Deleted All',
                    type: 'success',
                  })
                  getData(true)
                } else {
                  console.log(res)
                  setToast({
                    text: 'Error While Deleting All',
                    type: 'warning',
                  })
                }
              })
              .catch((e) => {
                console.log(e)
                setToast({
                  text: 'Error While Deleting All',
                  type: 'warning',
                })
              })
            setVisible(false)
          }}
          style={{
            background: 'red',
            color: 'white',
          }}
        >
          Clear All
        </Modal.Action>
      </Modal>
    </>
  )
}
