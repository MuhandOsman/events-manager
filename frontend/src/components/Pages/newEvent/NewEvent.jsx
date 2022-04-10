import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import "./newEvent.css";


const NewEvent = () => {
  const navigate = useNavigate();
    
    const [file , setFile] = useState({})
    
    const [eventForm, setEventForm] = useState({title:"" , category:"", price:"", date:"", description:"",location:"" })

    const handleEventForm = (e) => {
        setEventForm({ ...eventForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      const str = JSON.stringify(eventForm)
        const data = new FormData();
        data.append("eventForm", str);
        data.append("thumbnail", file);
        
        try {
            axios.post("/api/event", data , {
              headers: { "Content-Type": "multipart/form-data"}
            })
            .then(resp => {
              console.log(resp) 
              if (resp.data)
                  navigate("/", { replace: true})
                  
            })
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <section className="new-event">
      <div className="new-event-bg"></div>
      <div className="container">
        <h1>Create your Event </h1>
        <Form inline>
          <FormGroup floating>
            <Input maxLength="25" bsSize="sm" id="title" name="title" placeholder="Title" type="text" value={eventForm.title} onChange={handleEventForm} />
            <Label for="title">Title</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
              maxLength="15"
              bsSize="sm"
              id="category"
              name="category"
              placeholder="category"
              type="text"
              value={eventForm.category}
              onChange={handleEventForm}
            />
            <Label for="category">category</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input maxLength="25" bsSize="sm" id="price" name="price" placeholder="price" type="price" value={eventForm.price} onChange={handleEventForm} />
            <Label for="price">Price</Label>
          </FormGroup>
          
          <FormGroup floating>
            <Input
              
              bsSize="sm"
              id="exampleDate"
              name="date"
              placeholder="date placeholder"
              type="datetime-local"
              value={eventForm.date}
              onChange={handleEventForm}
            />
            <Label for="exampleDate">Date</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              maxLength="25"
              bsSize="sm"
              id="location"
              name="location"
              placeholder="location"
              type="text"
              value={eventForm.location}
              onChange={handleEventForm}
            />
            <Label for="location">Location</Label>
          </FormGroup>
          <FormGroup >
            <Label style={{color:"floralwhite"}} for="exampleText">add description</Label>
            <Input bsSize="sm" id="exampleText" name="description" type="textarea" maxLength="500" value={eventForm.description} onChange={handleEventForm} />
          </FormGroup>
          <FormGroup>
            <Label style={{color:"floralwhite"}} for="exampleFile">Image</Label>
            <Input bsSize="sm" id="exampleFile" name="thumbnail" type="file" onChange={ (e)=> { 
              const file = e.target.files[0]
              setFile(file)}} />
            <FormText color="light">upload an image (jpeg,jpg,png,gif)</FormText>
          </FormGroup>
          <Button className="custom-btn btn-8" onClick={() => handleSubmit()}><span>Submit</span></Button>
        </Form>
      </div>
    </section>
  );
};

export default NewEvent;
