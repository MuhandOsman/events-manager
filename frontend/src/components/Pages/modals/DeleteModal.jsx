import axios from "axios";
import React, { useContext } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MyContext from "../../../context/MyContext";

const DeleteModal = () => {
  const store = useContext(MyContext)
  const {openDeleteModal, setOpenDeleteModal,setOpenUpdateModal,eventId} = store;

  const deleteEvent = () => {
    console.log(eventId);
    axios.delete(`/api/event/${eventId}`).then(resp => {
      console.log(resp)
      setOpenDeleteModal(false)});
      window.location.reload();
    
  }
  return (
    <div>
      <Modal
        size="md"
        isOpen={openDeleteModal}
        centered
        scrollable
        toggle={() => setOpenDeleteModal(false)}
      >
        <ModalHeader toggle={() => setOpenDeleteModal(false)}>
          Delete Event
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete this Event? you can update it!!
        </ModalBody>
        <ModalFooter>
        
          <Button color="danger" onClick={deleteEvent}>
            DELETE EVENT
          </Button>
          <Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteModal;
