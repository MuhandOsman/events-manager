import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavItem,
  
} from "reactstrap";

import {ImFire} from "react-icons/im"
import {CgMenuOreos} from "react-icons/cg"

import MyContext from "../../context/MyContext"
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const store = useContext(MyContext);
  const {setLogin} = store;

  const [open, setOpen] = useState(false);

  const signOut = ()=> {
    
    axios.delete("/api/signout").then(response => {
      setLogin(false)
      localStorage.removeItem("user-id")
      navigate("/", { replace: true })
      
      
    })
  };
  const storedId =JSON.parse(localStorage.getItem("user-id")) || "";

  return (
    <>
      <div>
        <Navbar className="navbar" expand="md" fixed="top" >
          <Link to="/">
            <ImFire size="70" color="red"/> <span className="logo-span" >EVENTLIT</span>
          </Link>
          <span className="nav-toggler" onClick={function toggler() {
              setOpen(!open);
            }}><CgMenuOreos size="40"/></span>
          <Collapse navbar className="collapse" isOpen={open} >
            <Nav className="me-auto flex-nav"  navbar >
              <NavItem className="nav-element">
                <Link to="/"><span className="nav-link">Events</span></Link>
              </NavItem>
              <NavItem className="nav-element">
                <Link to="/about/"><span className="nav-link">About</span></Link>
              </NavItem>
              {!storedId && <NavItem className="nav-element">
                <Link to="/form/"><span className="nav-link">Login/Register</span></Link>
              </NavItem>}
              {storedId && <NavItem className="nav-element">
                <Link  to="/create-event/"><span className="nav-link">Create Event</span></Link>
              </NavItem>}
              {storedId &&<NavItem className="nav-element">
                <Link  to="/user/"><span className="nav-link">My Profile</span></Link>
              </NavItem>}
            </Nav>

            {storedId && <span  className="signOut"  onClick={signOut}>
              Sign out
            </span>}
          </Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;
