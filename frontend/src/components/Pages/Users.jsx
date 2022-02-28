import { useState, useContext } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import MyContext from '../../context/MyContext';

const Users = () => {
  const context = useContext(MyContext)
  const {postForm} = context;


  const [form ,setForm] =useState({email:"" , password: ""});

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    //setForm({email:"" , password: ""})
    postForm("http://localhost:8000/login", form)  
  }
  return (
    <section>
      <h2>Please Login </h2>
      <Form inline>
    <FormGroup floating>
      <Input
        id="exampleEmail"
        name="email"
        placeholder="Email"
        type="email"
        onChange={() => handleChange}
      />
      <Label for="exampleEmail">
        Email
      </Label>
    </FormGroup>
    {'can we use this line? '}
    <FormGroup floating>
      <Input
        id="examplePassword"
        name="password"
        placeholder="Password"
        type="password"
      />
      <Label for="examplePassword">
        Password
      </Label>
    </FormGroup>
    {' '}
    <Button onClick={() => handleSubmit}>
      Submit
    </Button>
  </Form>
    </section>
  )
}

export default Users