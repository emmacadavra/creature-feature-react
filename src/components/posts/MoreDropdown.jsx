import React from "react";
import { Dropdown } from "react-bootstrap";
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
  />
));

ThreeDotsMeatballs.displayName = "ThreeDotsMeatballs";

export const MoreDropdown = () => {
  return (
    <Dropdown className="ms-auto" drop="left">
      <Dropdown.Toggle as={ThreeDotsMeatballs} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item>EDIT</Dropdown.Item>
        <Dropdown.Item>BIN</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
