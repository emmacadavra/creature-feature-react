import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import styles from "../styles/MoreDropdown.module.css";
import threeDots from "../assets/three_dots.png";

// const ThreeDotsMeatballs = React.forwardRef(({ onClick }, ref) => {
//   return (
//     <Dropdown>
//       <Dropdown.Toggle variant="success" id="dropdown-basic" />

//       <Dropdown.Menu>
//         <Dropdown.Item
//           onClick={() => {
//             console.log("onClick handler");
//           }}
//         >
//           Action
//         </Dropdown.Item>
//         <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//         <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// });

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
