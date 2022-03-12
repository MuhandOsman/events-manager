import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const DeleteModal = ({openDeleteModal,setOpenDeleteModal}) => {

  return (
    <div>
  
  <Modal
    isOpen={openDeleteModal}
    centered
    scrollable
    toggle={() => setOpenDeleteModal(false)}
  >
    <ModalHeader toggle={() => setOpenDeleteModal(false)}>
      Delete Event
    </ModalHeader>
    <ModalBody>
      Are you sure you want to delete this Event? you can update it instead!!
    </ModalBody>
    <ModalFooter>
      <Button
        color="danger"
        onClick={function noRefCheck(){}}
      >
        DELETE EVENT
      </Button>
      <Button
        color="primary"
        onClick={function noRefCheck(){}}
      >
        Update Event
      </Button>
      {' '}
      <Button onClick={() => setOpenDeleteModal(false)}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
</div>
  )
}

export default DeleteModal