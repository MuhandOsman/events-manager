import { useLocation } from "react-router-dom";
import  { useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label
  
 
} from "reactstrap";

const UpdateModal = ({openUpdateModal,setOpenUpdateModal}) => {
  const location = useLocation();
  const item = location.state;
  
  const [updateEvent,setUpdateEvent] = useState({title:item.title , category:item.category, price:item.price, date:item.date, description:item.description,location:item.location })
  const [updatedFile,setUpdatedFile] = useState({})

  const handleUpdate = (e) => {
    setUpdateEvent({...updateEvent,[e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    const str = JSON.stringify(updateEvent)
      const data = new FormData();
      data.append("updateEvent", str);
      data.append("thumbnail", updatedFile);
      // console.log("form :",updateEvent);
      try {
        axios.patch(`/api/event/${item.id}`, data , {
          headers: { "Content-Type": "multipart/form-data"}
        }
        )
        .then(resp => {
          console.log(resp)
          
        } )
      } catch (error) {
          console.error(error)
      }
  }

  return (
    
    <div className="container">
        
        <Form inline>
              <FormGroup floating>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title"
                  type="text" value={updateEvent.title} onChange={handleUpdate}
                />
                <Label for="title">Title</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="category"
                  name="category"
                  placeholder="category"
                  type="text"
                  value={updateEvent.category}
                  onChange={handleUpdate}
                />
                <Label for="category">category</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="price"
                  name="price"
                  placeholder="price"
                  type="price" value={updateEvent.price} onChange={handleUpdate}
                />
                <Label for="price">Price</Label>
              </FormGroup>
              <FormGroup floating>
                <Input
                  id="exampleDate"
                  name="date"
                  placeholder="date placeholder"
                  type="datetime-local"

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
                  value={updateEvent.location}
                  onChange={handleUpdate}
                />
                <Label for="location">Location</Label>
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">add description</Label>
                <Input
                  id="exampleText"
                  name="description"
                  type="textarea" value={updateEvent.description} onChange={handleUpdate}
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
              
            <Button color="success" onClick={() => handleSubmit()}>send changes
          </Button>
            </Form>
       
    </div>
    
  );
};

export default UpdateModal;
