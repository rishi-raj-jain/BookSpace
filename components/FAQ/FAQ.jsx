import FAQCard from './Card'
import { useEffect, useState } from 'react'
import { Button, Grid, Modal, Note, Spacer, useModal, useToasts } from '@geist-ui/core'

export default function () {
  const [data, setData] = useState([])
  const { setToast } = useToasts()
  const { visible, setVisible, bindings } = useModal()

  const getData = (scratch = false) => {
    fetch(`/api/faq/get`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.FAQs)
        if (scratch) {
          setData(res.FAQs)
        } else {
          setData((data) => [...data, ...res.FAQs])
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      {data.length > 0 &&
        data.map((item) => {
          return <FAQCard key={item?.createdAt} {...item} getData={getData} />
        })}
      {data.length < 1 && <Note label={false}>No FAQs to show.</Note>}
      {data.length > 0 && (
        <Grid.Container mt={1} gap={2}>
          <Grid>
            <Button
              type="error"
              onClick={(e) => {
                setVisible(true)
              }}
            >
              Clear All FAQs
            </Button>
          </Grid>
        </Grid.Container>
      )}
      <Spacer h={2} />
      <Modal {...bindings}>
        <Modal.Title font={0.8}>Are you sure you want to clear all FAQs?</Modal.Title>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action
          onClick={(e) => {
            fetch(`/api/faq/del`, {
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
