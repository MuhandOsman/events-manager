import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from "reactstrap";

import {ImFire} from "react-icons/im"
import {CgMenuOreos} from "react-icons/cg"

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
      console.log(response);
    })
  };

  return (
    <>
      <div>
        <Navbar className="navbar" expand="md" fixed="top" >
          <NavbarBrand href="/">
            <ImFire size="70" color="red"/> <span className="logo-span" >EVENTLIT</span>
          </NavbarBrand>
          <span className="nav-toggler" onClick={function toggler() {
              setOpen(!open);
            }}><CgMenuOreos size="40"/></span>
          <Collapse navbar className="collapse" isOpen={open} >
            <Nav className="me-auto flex-nav"  navbar >
              <NavItem className="nav-element">
                <NavLink  href="/">Events Page</NavLink>
              </NavItem>
              <NavItem >
                <NavLink className="nav-element" href="/about/">About</NavLink>
              </NavItem>
              <NavItem className="nav-element">
                <NavLink  href="/form/">Login/Register</NavLink>
              </NavItem>
              {storedId && <NavItem className="nav-element">
                <NavLink href="/create-event/">Create Event</NavLink>
              </NavItem>}
              {storedId &&<NavItem className="nav-element">
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
