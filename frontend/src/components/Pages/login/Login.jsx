import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"

import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import MyContext from "../../../context/MyContext";
import Register from "../register/Register";
import ErrorOrSuccess from "../modals/ErrorOrSuccess"

const Users = () => {
  const navigate = useNavigate();

  const context = useContext(MyContext);
  const { postForm,setLogin,error, setError,setErrorOrSuccess } = context;

  
  const [form, setForm] = useState({ email: "", password: "12345" });
  const [open, setOpen] = useState(false);

  

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    /* e.preventDefault()
    setForm({email:"" , password: ""}) */
    try {
      postForm("/api/login", form)
        .then((resp) => { 
          if (!resp.ok) {
            setLogin(false);
            throw new Error(resp.message);
          } else {
            setLogin(true);
            localStorage.setItem("user-id", JSON.stringify(resp));
            setError(null)
            
          }
        }).then((resp) => navigate("/" , { replace: true}))
        .catch((error) => {
          
          setError(error.message);
        });
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <section className="login-section" >
      <div className="login-bg"></div>
      <Form inline className="loginForm">
        <h1>Login to your account </h1>
        <FormGroup color="black" floating>
          <Input
            required={true}
            id="Email"
            name="email"
            placeholder="Email"
            value={form.email}
            type="email"
            onChange={handleFormChange}
          />
          <Label for="Email">Email</Label>
        </FormGroup>
        {""}
        <FormGroup floating>
          <Input
            required={true}
            id="Password"
            name="password"
            placeholder="Password"
            value={form.password}
            type="password"
            onChange={handleFormChange}
          />
          <Label for="examplePassword">Password</Label>
        </FormGroup>{" "}
        <Button className="custom-btn btn-7" onClick={() => handleSubmit()}>
          <span>Submit</span>
        </Button>
          <Label style={{margin: "0 10px 0 50px" , color: "white"}}>new user?</Label>
          <Button
            className="custom-btn btn-7 btn-red"
            onClick={() => {
              setOpen(true);
            }}
          >
            <span>Register</span>
          </Button>
        <div>
          <Modal isOpen={open}>
            <ModalHeader toggle={() => setOpen(false)}>
              Registration form
            </ModalHeader>
            <ModalBody>
              {/* start of Register form in modalBody */}

              <Register  setOpen={setOpen} error={error} setError={setError} />
              {/* end of Register form in modalBody */}
            </ModalBody>
            <ModalFooter>
              {" "}
              <Button className="custom-btn btn-7 btn-red" onClick={() => setOpen(false)}>
                <span>Cancel</span> 
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <ErrorOrSuccess />
      {error && 
        setErrorOrSuccess(true)
        
        }
      </Form>

      
    </section>
  );
};

export default Users;
