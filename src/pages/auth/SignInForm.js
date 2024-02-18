import React, { useContext, useState } from "react";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import cf_text_logo from "../../assets/cf_text_logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SetCurrentUserContext } from "../../App";

const SignInForm = () => {
  const setCurrentUser = useContext(SetCurrentUserContext);

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      navigate("/");
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
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
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
            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                className={`mt-2 ${styles.FormInput}`}
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
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
              className={`${btnStyles.Button} ${btnStyles.Large}`}
            >
              Sign in!
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
          <Link to="/signup" className={styles.Link}>
            Don&apos;t have an account?
            <br />
            <span>Sign up here!</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
};

export default SignInForm;
