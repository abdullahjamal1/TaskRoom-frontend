import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import LoginContext from "../contexts/loginContext";
import {
  Col,
  Image,
  Navbar,
  Nav,
  Form,
  Button,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import { getDefaultAvatar, getAvatar } from "../services/userService";

const NavBar = ({ user }) => {
  const loginModal = useContext(LoginContext);
  return (
    <Navbar bg="info" variant="dark" expand="lg">
      <Navbar.Brand href="/groups">
        <i class="fa fa-thumb-tack" aria-hidden="true"></i> TaskRoom
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form> */}

        {!user && (
          <React.Fragment>
            <Nav.Link
              className="nav-link nav-item mr-auto btn btn-info mr-sm-2 border-dark"
              onClick={loginModal.onHandleShow}
              href="#"
            >
              Login <i class="fa fa-sign-in" aria-hidden="true"></i>
            </Nav.Link>

            <Nav.Link
              className="nav-link nav-item  navbar-right btn btn-info border-dark"
              href="/register"
            >
              Sign Up
            </Nav.Link>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <Nav.Link
              className="nav-link nav-item navbar-right btn btn-info mr-sm-2"
              href={`/users/${user.sub}`}
            >
              {/* <img
                onError={getDefaultAvatar}
                src={getAvatar(1)}
                styles={{ maxWidth: "5 px", maxHeight: "5 px" }}
                className="thumbnail mr-2"
              /> */}
              {user.sub}
            </Nav.Link>

            <Nav.Link
              className="nav-link nav-item navbar-right btn btn-info"
              href="/logout"
            >
              Logout <i class="fa fa-sign-out" aria-hidden="true"></i>
            </Nav.Link>
          </React.Fragment>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
