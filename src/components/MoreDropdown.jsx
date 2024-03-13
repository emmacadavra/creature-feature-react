import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import styles from "./MoreDropdown.module.css";
import threeDots from "../assets/three_dots.png";
import editPostOrComment from "../assets/edit.png";
import deletePostOrComment from "../assets/bin.png";
import editProfile from "../assets/editprofile.png";

const ThreeDotsMeatballs = React.forwardRef(({ onClick }, ref) => (
  <Button
    ref={ref}
    onClick={(event) => {
      event.preventDefault();
      onClick(event);
    }}
    className={styles.Meatballs}
  >
    <img src={threeDots} aria-label="Expand for more options" />
  </Button>
));

ThreeDotsMeatballs.displayName = "ThreeDotsMeatballs";

export const MoreDropdown = ({ onEdit, onDelete }) => {
  return (
    <Dropdown className="ms-auto" drop="start">
      <Dropdown.Toggle as={ThreeDotsMeatballs} />

      <Dropdown.Menu
        className="text-center"
        show={false}
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={onEdit}
          aria-label="Edit post"
        >
          <img src={editPostOrComment} alt="Edit" />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={onDelete}
          aria-label="Delete post"
        >
          <img src={deletePostOrComment} alt="Delete" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const ProfileEditDropdown = ({ onEdit }) => {
  return (
    <Dropdown className="ms-auto" drop="start">
      <Dropdown.Toggle as={ThreeDotsMeatballs} />

      <Dropdown.Menu className={`${styles.DropdownMenu} text-center`}>
        <Dropdown.Item
          className={`${styles.DropdownItem} text-center`}
          onClick={onEdit}
          aria-label="Edit profile"
        >
          <img
            src={editProfile}
            className={`${styles.EditProfileIcon}`}
            alt="Edit profile"
          />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
