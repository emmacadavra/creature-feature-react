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
    <Dropdown className="ms-auto">
      <Dropdown.Toggle as={ThreeDotsMeatballs} id="dropdown-custom-components">
        Custom toggle
      </Dropdown.Toggle>

      <Dropdown.Menu popperConfig={{ strategy: "fixed" }}>
        <Dropdown.Item eventKey="1">Red</Dropdown.Item>
        <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
        <Dropdown.Item eventKey="3" active>
          Orange
        </Dropdown.Item>
        <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
