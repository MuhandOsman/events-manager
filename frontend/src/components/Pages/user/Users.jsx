import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

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

const Users = () => {
  const navigate = useNavigate();

  const context = useContext(MyContext);
  const { postForm } = context;

  const [login, setLogin] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [open, setOpen] = useState(false);

  const [error, setError] = useState(null);

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
            
            localStorage.setItem("user-id", JSON.stringify(resp));
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
    <section>
      <Form inline className="loginForm">
        <h2>login to your account </h2>
        <FormGroup floating>
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
        <Button color="primary" onClick={() => handleSubmit()}>
          Submit
        </Button>
        <div>
          <Label>new to Event-manager?</Label>
          <Button
            color="danger"
            onClick={() => {
              setOpen(true);
            }}
          >
            Register
          </Button>
          <Modal isOpen={open}>
            <ModalHeader toggle={() => setOpen(false)}>
              Registration form
            </ModalHeader>
            <ModalBody>
              {/* start of Register form in modalBody */}

              <Register open={open} setOpen={setOpen} />
              {/* end of Register form in modalBody */}
            </ModalBody>
            <ModalFooter>
              {" "}
              <Button color="danger" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </Form>

      {error && <div className="show-error">{error}</div>}
      {login && (
        <button
          className="to-home"
          onClick={() => navigate("../", { replace: true })}
        >
          to main page
        </button>
      )}
    </section>
  );
};

export default Users;
