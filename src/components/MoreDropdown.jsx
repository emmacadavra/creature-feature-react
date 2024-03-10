import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import styles from "./MoreDropdown.module.css";
import threeDots from "../assets/three_dots.png";
import { useNavigate } from "react-router-dom";

const ThreeDotsMeatballs = React.forwardRef(({ onClick }, ref) => (
  <Button
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className={styles.Meatballs}
  >
    <img src={threeDots} />
  </Button>
));

ThreeDotsMeatballs.displayName = "ThreeDotsMeatballs";

export const MoreDropdown = ({ onEdit, onDelete }) => {
  return (
    <Dropdown className="ms-auto" drop="start">
      <Dropdown.Toggle as={ThreeDotsMeatballs} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={onEdit}
          aria-label="Edit post"
        >
          EDIT
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={onDelete}
          aria-label="Delete post"
        >
          BIN
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const ProfileEditDropdown = ({ id, onEdit }) => {
  const navigate = useNavigate();
  return (
    <Dropdown className="ms-auto" drop="down">
      <Dropdown.Toggle as={ThreeDotsMeatballs} />

      <Dropdown.Menu>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={onEdit}
          aria-label="Edit profile"
        >
          <span>icon</span>
          Edit profile
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => navigate(`/profiles/${id}/edit/username`)}
          aria-label="Change username"
        >
          <span>icon</span>
          Change username
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => navigate(`/profiles/${id}/edit/password`)}
          aria-label="Change password"
        >
          <span>icon</span>
          Change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
