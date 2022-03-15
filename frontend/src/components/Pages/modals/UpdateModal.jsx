
import  { useContext, useState } from "react";
import axios from "axios";
import MyContext from "../../../context/MyContext";
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";

const UpdateModal = () => {

  const store = useContext(MyContext)
  const {openUpdateModal, setOpenUpdateModal,eventToUpdate,setEventToUpdate} = store;
  
  // const [updateEvent,setUpdateEvent] = useState({...eventToUpdate})
  const [updatedFile,setUpdatedFile] = useState({})

  const handleUpdate = (e) => {
    setEventToUpdate({...eventToUpdate,[e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    const str = JSON.stringify(eventToUpdate)
      const data = new FormData();
      data.append("updateEvent", str);
      data.append("thumbnail", updatedFile);
      ;
      try {
        axios.patch(`/api/event/${eventToUpdate.id}`, data , {
          headers: { "Content-Type": "multipart/form-data"}
        }
        )
        .then(resp => {
          console.log(resp)
          setOpenUpdateModal(false);
          /* window.location.reload(); */ 
        } )
      } catch (error) {
          console.error(error)
      }
  }

  return (
    
    <div className="container">
        <Modal
        isOpen={openUpdateModal}
        centered
        scrollable
        toggle={() => setOpenUpdateModal(false)}
      >
        <ModalHeader toggle={() => setOpenUpdateModal(false)}>
          Update Event
        </ModalHeader>
        <ModalBody>
        <Form inline>
              <FormGroup floating>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title"
                  type="text" value={eventToUpdate.title} onChange={handleUpdate}
                />
                <Label for="title">Title</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="category"
                  name="category"
                  placeholder="category"
                  type="text"
                  value={eventToUpdate.category}
                  onChange={handleUpdate}
                />
                <Label for="category">category</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="price"
                  name="price"
                  placeholder="price"
                  type="price" value={eventToUpdate.price} onChange={handleUpdate}
                />
                <Label for="price">Price</Label>
              </FormGroup>
              <FormGroup floating>
                <Input
                  id="exampleDate"
                  name="date"
                  placeholder="date placeholder"
                  type="datetime-local"
                  value={eventToUpdate.date}
                  onChange={handleUpdate}
                />
                <Label for="exampleDate">Date</Label>
              </FormGroup>
              <FormGroup floating>
                <Input
                  id="location"
                  name="location"
                  placeholder="location"
                  type="text"
                  value={eventToUpdate.location}
                  onChange={handleUpdate}
                />
                <Label for="location">Location</Label>
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">add description</Label>
                <Input
                  id="exampleText"
                  name="description"
                  type="textarea" value={eventToUpdate.description} onChange={handleUpdate}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleFile">Image</Label>
                <Input
                  id="exampleFile"
                  name="thumbnail"
                  type="file"
                  onChange={(e) => {
                  const file = e.target.files[0];
                  console.log("img", file);
                  setUpdatedFile(file)
                }}
                />
                <FormText>upload an image (jpeg,jpg,png,gif)</FormText>
              </FormGroup>
              
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="success" onClick={() => handleSubmit()}>send changes
          </Button>
          
          <Button onClick={() => setOpenUpdateModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
    
  );
};

export default UpdateModal;

