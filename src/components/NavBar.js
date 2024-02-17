import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";
import cf_logo_small from "../assets/cf_logo_small.png";
import home from "../assets/home.png";
import login from "../assets/login.png";
import signup from "../assets/signup.png";

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <Navbar.Brand className={styles.NavBrand}>
          <img src={cf_logo_small} alt="Logo" height="60" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-end">
            <Nav.Link className={styles.NavLink}>
              <img
                src={home}
                alt="Home"
                height="32"
                className={styles.NavIcon}
              />
              Home
            </Nav.Link>
            <Nav.Link className={styles.NavLink}>
              <img
                src={login}
                alt="Sign In"
                height="32"
                className={styles.NavIcon}
              />
              Sign In
            </Nav.Link>
            <Nav.Link className={styles.NavLink}>
              <img
                src={signup}
                alt="Sign Up"
                height="32"
                className={styles.NavIcon}
              />
              Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
