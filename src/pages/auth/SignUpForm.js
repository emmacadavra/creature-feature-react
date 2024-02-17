import React from "react";
import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";
import styles from "../../styles/SignUpForm.module.css";
import signup_sticker from "../../assets/signup_sticker.png";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  return (
    <Row>
      <Col>
        <Container>
          <img src={signup_sticker} alt="Sign Up!" />
        </Container>
        <Container>
          <Link to="/signin">Already have an account? Sign in!</Link>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;
