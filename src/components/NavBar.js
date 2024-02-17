import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";
import cf_logo_small from "../assets/cf_logo_small.png";
import home from "../assets/home.png";
import login from "../assets/login.png";
import signup from "../assets/signup.png";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink to="/">
          <Navbar.Brand className={styles.NavBrand}>
            <img src={cf_logo_small} alt="Logo" height="60" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-end">
            <NavLink end to="/" className={styles.NavLink}>
              <img
                src={home}
                alt="Home"
                height="32"
                className={styles.NavIcon}
              />
              Home
            </NavLink>
            <NavLink to="/signin" className={styles.NavLink}>
              <img
                src={login}
                alt="Sign In"
                height="32"
                className={styles.NavIcon}
              />
              Sign In
            </NavLink>
            <NavLink to="/signup" className={styles.NavLink}>
              <img
                src={signup}
                alt="Sign Up"
                height="32"
                className={styles.NavIcon}
              />
              Sign Up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
