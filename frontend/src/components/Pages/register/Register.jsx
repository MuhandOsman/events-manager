import React, { useContext, useState } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import MyContext from "../../../context/MyContext"

const Register = ({setLogin,setOpen,error, setError}) => {
    const context = useContext(MyContext)
    const {postForm} = context

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
              console.log(resp._id);
              if (!resp._id) {
                setLogin(false);
                throw new Error(resp.message);
              } else {
                
                localStorage.setItem("user-id", JSON.stringify(resp._id));
                setLogin(true);
                setError(null)
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
    <Button onClick={handleRegisterSubmit}>
      Submit
    </Button >
    {error && <div className="show-error">{error}</div> }
  </Form>
  )
}

export default Register