import { useState, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import MyContext from '../../context/MyContext';

const Users = () => {
  const navigate = useNavigate()

  const context = useContext(MyContext)
  const {postForm} = context;

  const [login ,setLogin] =useState(false);
  const [form ,setForm] =useState({email:"" , password: ""});

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    /* e.preventDefault() */
    //setForm({email:"" , password: ""})
    postForm("http://localhost:8000/login", form)
    .then(data => { 
      console.log(data)})
    setLogin(true);    
  }
  return (
    <section>
      <h2>Please Login </h2>
      <Form inline>
    <FormGroup floating>
      <Input
        id="Email"
        name="email"
        placeholder="Email"
        value={form.email}
        type="email"
        onChange={handleChange}
      />
      <Label for="exampleEmail">
        Email
      </Label>
    </FormGroup>
    {'can we use this line? '}
    <FormGroup floating>
      <Input
        id="Password"
        name="password"
        placeholder="Password"
        value={form.password}
        type="password"
        onChange={ handleChange}
      />
      <Label for="examplePassword">
        Password
      </Label>
    </FormGroup>
    {' '}
    <Button onClick={() => handleSubmit()}>
      Submit
    </Button>
  </Form>

  {/* <div>
  <Button
    color="danger"
    onClick={function noRefCheck(){}}
  >
    Click Me
  </Button>
  <Modal
    toggle={function noRefCheck(){}}
  >
    <ModalHeader toggle={function noRefCheck(){}}>
      Modal title
    </ModalHeader>
    <ModalBody>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        onClick={function noRefCheck(){}}
      >
        Do Something
      </Button>
      {' '}
      <Button onClick={function noRefCheck(){}}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
</div> */}

  {login && navigate ("../" , {replace:true})}
    </section>
  )
}

export default Users