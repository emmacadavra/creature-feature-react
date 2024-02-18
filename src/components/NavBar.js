import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";
import cf_logo_small from "../assets/cf_logo_small.png";
import home from "../assets/home.png";
import login from "../assets/login.png";
import signup from "../assets/signup.png";
import newpost from "../assets/newpost.png";
import myfeed from "../assets/myfeed.png";
import faves from "../assets/faves.png";
import logout from "../assets/logout.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";
import Avatar from "./Avatar.js";
import axios from "axios";

const NavBar = () => {
  const { currentUser } = useAuth();
  const { setCurrentUser } = useAuth();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const newPostIcon = (
    <NavLink to="/posts/create" className={styles.NavLink}>
      <img
        src={newpost}
        alt="Create new post"
        height="32"
        className={styles.NavIcon}
      />
      Create Post
    </NavLink>
  );
  const loggedInNavLinks = (
    <>
      <NavLink to="/myfeed" className={styles.NavLink}>
        <img
          src={myfeed}
          alt="My feed"
          height="32"
          className={styles.NavIcon}
        />
        My Feed
      </NavLink>
      <NavLink to="/myfaves" className={styles.NavLink}>
        <img
          src={faves}
          alt="My faves"
          height="32"
          className={styles.NavIcon}
        />
        My Faves
      </NavLink>
      <NavLink to="/" className={styles.NavLink}>
        <img
          src={logout}
          alt="Sign out"
          height="32"
          onClick={handleSignOut}
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
          text="My profile"
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
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <NavLink to="/">
        <Navbar.Brand className={styles.NavBrand}>
          <img src={cf_logo_small} alt="Logo" height="60" />
        </Navbar.Brand>
      </NavLink>
      {currentUser && newPostIcon}
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
