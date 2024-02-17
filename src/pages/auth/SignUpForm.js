import React from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import cf_text_logo from "../../assets/cf_text_logo.png";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  return (
    <Row className={`justify-content-center ${styles.Row}`}>
      <Col xs={12} m={8} lg={6}>
        <Container className={`text-center mt-3 ${appStyles.Content}`}>
          <img
            src={cf_text_logo}
            alt="Creature Feature"
            className={styles.SignInUpLogo}
          />
          <Form>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Enter a username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a username"
                name="username"
                className={`mt-2 ${styles.FormInput}`}
              />
            </Form.Group>
            <Form.Group controlId="password1">
              <Form.Label className="d-none">Create password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create password"
                name="password1"
                className={`mt-2 ${styles.FormInput}`}
              />
            </Form.Group>
            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="password2"
                className={`mt-2 ${styles.FormInput}`}
              />
            </Form.Group>
            <Button
              type="submit"
              className={`${btnStyles.Button} ${btnStyles.Large}`}
            >
              Sign up!
            </Button>
          </Form>
        </Container>
        <Container className={`text-center mt-3 ${appStyles.Content}`}>
          <Link to="/signin" className={styles.Link}>
            Already have an account?
            <br />
            <span>Sign in here!</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;
