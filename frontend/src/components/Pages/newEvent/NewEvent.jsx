import React from "react";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import "./newEvent.css";

const NewEvent = () => {
  return (
    <section>
      <div className="container">
        <h2>Add your Event </h2>
        <Form inline>
          <FormGroup floating>
            <Input id="title" name="title" placeholder="Title" type="title" />
            <Label for="title">Title</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
              id="category"
              name="category"
              placeholder="category"
              type="category"
            />
            <Label for="category">category</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input id="price" name="price" placeholder="price" type="price" />
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
            />
            <Label for="exampleDate">Date</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              id="exampleTime"
              name="time"
              placeholder="time placeholder"
              type="time"
            />
            <Label for="exampleTime">Time</Label>
          </FormGroup>
          <FormGroup >
            <Label for="exampleText">add description</Label>
            <Input id="exampleText" name="text" type="textarea" placeholder="" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">Image</Label>
            <Input id="exampleFile" name="file" type="file" />
            <FormText>upload an image (jpeg,jpg,png,gif)</FormText>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    </section>
  );
};

export default NewEvent;
