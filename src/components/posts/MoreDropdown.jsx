import React from "react";
import { Dropdown } from "react-bootstrap";
import styles from "../../styles/MoreDropdown.module.css";
import threeDots from "../../assets/three_dots.png";

const ThreeDotsMeatballs = React.forwardRef(({ onClick }, ref) => (
  <img
    src={threeDots}
    height={38}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className={styles.Meatballs}
  />
));

ThreeDotsMeatballs.displayName = "ThreeDotsMeatballs";

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ms-auto" drop="start">
      <Dropdown.Toggle as={ThreeDotsMeatballs} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="Edit post"
        >
          EDIT
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="Delete post"
        >
          BIN
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
