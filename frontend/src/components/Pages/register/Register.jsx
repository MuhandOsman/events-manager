import React, { useContext, useState } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { useNavigate } from "react-router-dom";

import MyContext from "../../../context/MyContext"

const Register = ({setOpen}) => {

  const navigate = useNavigate();
    const context = useContext(MyContext)
    const {postForm,error, setError,setLogin} = context

    const [register , setRegister] = useState({firstName:"", lastName:"",email:"" , password: ""})

    

    const handleRegChange = (e) => {
        setRegister({...register, [e.target.name]: e.target.value})
    }

    const handleRegisterSubmit = (e) => {
        try {
            e.preventDefault();
            setOpen(false)
            postForm("/api/user/register" , register)
            .then((resp) => { 
              
              if (!resp._id) {
                setLogin(false);
                throw new Error(resp.message);
              } else {
                
                localStorage.setItem("user-id", JSON.stringify(resp));
                setLogin(true);
                setError(null);
                navigate("/", { replace: true })
              }
            })
            .catch((error) => {
              
              setError(error.message);
            });
        } catch (error) {
          console.error(error.message);
        }
      };

  return (
    <Form inline className="loginForm">
    <FormGroup floating>
      <Input
        maxLength="15"
        id="firstName"
        name="firstName"
        placeholder="firstName"
        type="firstName"
        value={register.firstName}
        onChange={handleRegChange}
      />
      <Label for="firstName">
      First Name
      </Label>
    </FormGroup>
    {' '}
    <FormGroup floating>
      <Input
        maxLength="15"
        id="lastName"
        name="lastName"
        placeholder="lastName"
        type="lastName"
        value={register.lastName}
        onChange={handleRegChange}
      />
      <Label for="lastName">
      Last Name
      </Label>
    </FormGroup>
    {' '}
    <FormGroup floating>
      <Input
        maxLength="25"
        id="Email"
        name="email"
        placeholder="Email"
        type="email"
        value={register.email}
        onChange={handleRegChange}
      />
      <Label for="Email">
        Email
      </Label>
    </FormGroup>
    <FormGroup floating>
      <Input
        maxLength="25"
        id="password"
        name="password"
        placeholder="password"
        type="password"
        value={register.password}
        onChange={handleRegChange}
      />
      <Label for="password">
      Password
      </Label>
    </FormGroup>
    <Button className="custom-btn btn-7"onClick={handleRegisterSubmit}>
      <span>S u b m i t</span> 
    </Button >
    {error && <div className="show-error">{error}</div> }
  </Form>
  )
}

export default Register