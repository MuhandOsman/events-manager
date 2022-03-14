import React, { useContext } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MyContext from "../../../context/MyContext";

const DeleteModal = () => {
  const store = useContext(MyContext)
  const {openDeleteModal, setOpenDeleteModal,eventId} = store
  const deleteEvent = (eventId) => {
    // now here the logic of delete event
    
  }
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
          Are you sure you want to delete this Event? you can update it
          instead!!
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteEvent}>
            DELETE EVENT
          </Button>{" "}
          <Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteModal;
