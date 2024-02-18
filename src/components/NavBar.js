import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";
import cf_logo_small from "../assets/cf_logo_small.png";
import home from "../assets/home.png";
import login from "../assets/login.png";
import signup from "../assets/signup.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";

const NavBar = () => {
  const { currentUser } = useAuth();
  const loggedInNavLinks = <>Logged in as: {currentUser?.username}</>;
  const loggedOutNavLinks = (
    <>
      <NavLink to="/signin" className={styles.NavLink}>
        <img src={login} alt="Sign In" height="32" className={styles.NavIcon} />
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
    </>
  );

  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <NavLink to="/">
        <Navbar.Brand className={styles.NavBrand}>
          <img src={cf_logo_small} alt="Logo" height="60" />
        </Navbar.Brand>
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto text-end">
          <NavLink end to="/" className={styles.NavLink}>
            <img src={home} alt="Home" height="32" className={styles.NavIcon} />
            Home
          </NavLink>
          {currentUser ? loggedInNavLinks : loggedOutNavLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
