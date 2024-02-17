import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";
import cf_logo_small from "../assets/cf_logo_small.png";
import home from "../assets/home.png";
import login from "../assets/login.png";
import register from "../assets/register.png";

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <Navbar.Brand>
          <img src={cf_logo_small} alt="Logo" height="60" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-end">
            <Nav.Link>
              <img src={home} alt="Home" height="32" />
              Home
            </Nav.Link>
            <Nav.Link>
              <img src={login} alt="Sign In" height="32" />
              Sign In
            </Nav.Link>
            <Nav.Link>
              <img src={register} alt="Sign Up" height="32" />
              Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
