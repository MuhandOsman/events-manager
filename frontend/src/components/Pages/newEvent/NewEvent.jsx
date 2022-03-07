import React, { useContext, useState } from "react";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import "./newEvent.css";

import MyContext from "../../../context/MyContext";

const NewEvent = () => {
    const shop = useContext(MyContext);
    const {postForm} = shop;

    const [eventForm, setEventForm] = useState({title:"" , category:"", price:"", date:"", time:"", description:"" })

    const handleEventForm = (e) => {
        setEventForm({ ...eventForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        //e.preventDefault();
        //setEventForm({title:"" , category:"", price:"", date:"", time:"", description:"" });
        try {
            postForm("/api/event" , eventForm)
            .then( data => console.log(data))
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <section>
      <div className="container">
        <h2>Add your Event </h2>
        <Form inline>
          <FormGroup floating>
            <Input id="title" name="title" placeholder="Title" type="text" value={eventForm.title} onChange={handleEventForm} />
            <Label for="title">Title</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
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
            <Input id="price" name="price" placeholder="price" type="price" value={eventForm.price} onChange={handleEventForm} />
            <Label for="price">Price</Label>
          </FormGroup>
          {/* <FormGroup floating>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email"
              type="email"
            />
            <Label for="exampleEmail">Email</Label>
          </FormGroup> */}
          <FormGroup floating>
            <Input
              id="exampleDate"
              name="date"
              placeholder="date placeholder"
              type="date"
              value={eventForm.date}
              onChange={handleEventForm}
            />
            <Label for="exampleDate">Date</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              id="exampleTime"
              name="time"
              placeholder="time placeholder"
              type="time"
              value={eventForm.time}
              onChange={handleEventForm}
            />
            <Label for="exampleTime">Time</Label>
          </FormGroup>
          <FormGroup >
            <Label for="exampleText">add description</Label>
            <Input id="exampleText" name="description" type="textarea" value={eventForm.description} onChange={handleEventForm} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">Image</Label>
            <Input id="exampleFile" name="filename" type="file" />
            <FormText>upload an image (jpeg,jpg,png,gif)</FormText>
          </FormGroup>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </Form>
      </div>
    </section>
  );
};

export default NewEvent;
