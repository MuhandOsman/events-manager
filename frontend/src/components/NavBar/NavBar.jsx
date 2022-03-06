import { useState } from "react";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";

import "./NavBar.css";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
        <Navbar className="navbar" expand="md" fixed="top" light>
          <NavbarBrand href="/">LOGO</NavbarBrand>
          <NavbarToggler
            onClick={function toggler() {
              setOpen(!open);
            }}
          />
          <Collapse navbar isOpen={open}>
            <Nav className="me-auto flex-nav" navbar>
              <NavItem>
                <NavLink href="/form/">Login/Register</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about/">About us</NavLink>
              </NavItem>
              <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav>
                  Options
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="/create-event/">Create Event</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;
