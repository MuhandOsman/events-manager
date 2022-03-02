import { useState, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import MyContext from '../../context/MyContext';
import Register from './Register';

const Users = () => {
  const navigate = useNavigate()

  const context = useContext(MyContext)
  const {postForm} = context;

  const [login ,setLogin] =useState(false);
  const [form ,setForm] =useState({email:"" , password: ""});
  const [open , setOpen] =useState(false);

  const handleFormChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    /* e.preventDefault() */
    //setForm({email:"" , password: ""})
    try {
      postForm("http://localhost:8000/login", form)
      .then(data => { 
        data.status === 204 && setLogin(true) 
      console.log(data)
      console.log(login)})
    } catch (error) {
      console.log(error.message);  
    }
  }
  return (
    <section>
      <Form inline className="loginForm">
      <h2 >login to your account </h2>
    <FormGroup floating>
      <Input 
        required = {true}
        id="Email"
        name="email"
        placeholder="Email"
        value={form.email}
        type="email"
        onChange={handleFormChange}
      />
      <Label for="Email">
        Email
      </Label>
    </FormGroup>
    {'can we use this line? '}
    <FormGroup floating>
      <Input
        required = {true}
        id="Password"
        name="password"
        placeholder="Password"
        value={form.password}
        type="password"
        onChange={ handleFormChange}
      />
      <Label for="examplePassword">
        Password
      </Label>
    </FormGroup>
    {' '}
    <Button color="primary" onClick={() => handleSubmit()}>
      Submit
    </Button>
  <div>
    <Label>new to Event-manager?</Label>
  <Button 
    color="danger"
    onClick={() => { setOpen(true)}}
  >
    Register
  </Button>
  <Modal isOpen={open} 
    
  >
    <ModalHeader toggle={() => setOpen(false)}>
      Registration form
    </ModalHeader>
    <ModalBody>
   {/* start of Register form in modalBody */}

    <Register />
   {/* end of Register form in modalBody */}
    </ModalBody>
    <ModalFooter>
      
      {' '}
      <Button 
      color="danger"
      onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
</div>
  </Form>


  {login && <button className="to-shop" onClick={()=>(navigate("../", {replace: true}))}>home</button>}
    </section>
  )
}

export default Users