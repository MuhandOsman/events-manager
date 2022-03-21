import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import img from "../../assets/EVENTS_small.png"

import MyContext from "../../context/MyContext"
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const store = useContext(MyContext);
  const {storedId,setLogin} = store;

  const [open, setOpen] = useState(false);

  const signout = ()=> {
    localStorage.removeItem("user-id")
    axios.delete("/api/signout").then(response => {setLogin(false)
      navigate("/", { replace: true })
      window.location.reload()
    })
  };

  return (
    <>
      <div>
        <Navbar className="navbar" expand="md" fixed="top" dark>
          <NavbarBrand href="">
            <img src={img} alt="" />
          </NavbarBrand>
          <NavbarToggler
            onClick={function toggler() {
              setOpen(!open);
            }}
          />
          <Collapse navbar isOpen={open}>
            <Nav className="me-auto flex-nav" navbar>
              <NavItem>
                <NavLink href="/">Events Page</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about/">About us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/form/">Login/Register</NavLink>
              </NavItem>
              {/* <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav>
                  Login/Register
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="/form/">Login</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => {
              setOpen(true);
              }}>Register</DropdownItem>
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
              {storedId && <NavItem>
                <NavLink href="/create-event/">Create Event</NavLink>
              </NavItem>}
              {storedId &&<NavItem>
                <NavLink href="/user/">My Profile</NavLink>
              </NavItem>}
            </Nav>

            {storedId && <NavLink className="signout"  onClick={signout}>
              Sign out
            </NavLink>}
          </Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;
