import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./Header.css";
import logo from "../../../images/logo.png";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user] = useAuthState(auth);

  const handleSignOut = () => {
    signOut(auth);
  }
  console.log(user);
  return (
    <>
      <Navbar collapseOnSelect expand="lg" sticky="top" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/"><img src={logo} height={30} alt="" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="text-center" href="home#services">Services</Nav.Link>
              <Nav.Link className="text-center" as={Link} to="home/#experts">Experts</Nav.Link>
              <NavDropdown className="text-center" title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link className="text-center" as={Link} to="/about">About</Nav.Link>
              {
                user && <>
                  <Nav.Link className="text-center" as={Link} to="/addservice">Add</Nav.Link>
                  <Nav.Link className="text-center" as={Link} to="/manageservices">Mange</Nav.Link>
                  <Nav.Link className="text-center" as={Link} to="/orders">Orders</Nav.Link>
                </>
              }
              {
                user ? 
                <button onClick={handleSignOut} className="btn btn-primary">Sign out</button>
                :
                <Nav.Link as={Link} to="login">
                Login
              </Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
