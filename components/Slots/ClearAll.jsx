import { Note, Button, Modal, useModal } from '@geist-ui/core'

const ClearAllSlots = () => {
  const { visible, setVisible, bindings } = useModal()
  return (
    <>
      <Note>Proceed with caution.</Note>
      <Button onClick={() => setVisible(true)} mt={2} style={{ width: '100px' }} type="secondary">
        Clear All Slots
      </Button>
      <Modal {...bindings}>
        <Modal.Title font={0.8}>Are you sure you want to clear all slots?</Modal.Title>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action
          onClick={(e) => {
            fetch(`/api/slots?clear=1&userEmail=admin`, {
              method: 'POST',
            })
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

export default ClearAllSlots
