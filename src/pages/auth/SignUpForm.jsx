import React, { useState } from "react";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";
import cf_text_logo from "../../assets/cf_text_logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      navigate("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={`justify-content-center ${styles.Row}`}>
      <Col xs={12} m={8} lg={6}>
        <Container className={`text-center mt-3 ${appStyles.Content}`}>
          <img
            src={cf_text_logo}
            alt="Creature Feature"
            className={styles.SignInUpLogo}
          />
          <h1>Create an account:</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Enter a username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a username"
                name="username"
                value={username}
                onChange={handleChange}
                className={`mt-2 ${styles.FormInput}`}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert
                variant="info"
                key={idx}
                className={styles.Alert}
                dismissible
              >
                {message}
              </Alert>
            ))}
            <Form.Group controlId="password1">
              <Form.Label className="d-none">Create password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create password"
                name="password1"
                value={password1}
                onChange={handleChange}
                className={`mt-2 ${styles.FormInput}`}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert
                variant="info"
                key={idx}
                className={styles.Alert}
                dismissible
              >
                {message}
              </Alert>
            ))}
            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
                className={`mt-2 ${styles.FormInput}`}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert
                variant="info"
                key={idx}
                className={styles.Alert}
                dismissible
              >
                {message}
              </Alert>
            ))}
            <Button
              type="submit"
              className={`${appStyles.Button} ${appStyles.Large}`}
            >
              Sign up!
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert
                variant="info"
                key={idx}
                className={`mt-1 mb-1 ${styles.Alert}`}
                dismissible
              >
                {message}
              </Alert>
            ))}
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
