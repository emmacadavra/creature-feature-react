import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";
import cfLogoSmall from "../assets/cf_logo_small.png";
import home from "../assets/home.png";
import login from "../assets/login.png";
import signup from "../assets/signup.png";
import logout from "../assets/logout.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle.js";

const NavBar = () => {
  const { currentUser } = useAuth();
  const { setCurrentUser } = useAuth();

  const { toggleExpand, setToggleExpand, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const loggedInNavLinks = (
    <>
      <NavLink to="/" onClick={handleSignOut} className={styles.NavLink}>
        <img
          src={logout}
          alt="Sign out"
          height="32"
          className={styles.NavIcon}
        />
        Sign Out
      </NavLink>
      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={styles.NavLink}
      >
        <Avatar
          src={currentUser?.profile_image}
          text="My Profile"
          height={38}
        />
      </NavLink>
    </>
  );
  const loggedOutNavLinks = (
    <>
      <NavLink to="/signin" className={styles.NavLink}>
        <img src={login} alt="Sign in" height="32" className={styles.NavIcon} />
        Sign In
      </NavLink>
      <NavLink to="/signup" className={styles.NavLink}>
        <img
          src={signup}
          alt="Sign up"
          height="32"
          className={styles.NavIcon}
        />
        Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={toggleExpand}
      expand="md"
      fixed="top"
      className={styles.NavBar}
    >
      <NavLink to="/">
        <Navbar.Brand className={styles.NavBrand}>
          <img src={cfLogoSmall} alt="Logo" height="60" />
        </Navbar.Brand>
      </NavLink>
      <Navbar.Toggle
        ref={ref}
        onClick={() => setToggleExpand(!toggleExpand)}
        aria-controls="basic-navbar-nav"
      />
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
