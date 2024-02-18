import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import upload from "../../assets/upload.png";

const CreatePost = () => {
  const [errors, setErrors] = useState({});

  const postFormFields = (
    <div>
      <Button>BUTTON</Button>
      <Button>ANOTHER BUTTON</Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col>
          <Container>
            <Form.Group>
              <Form.Label>LABEL</Form.Label>
            </Form.Group>
            <div>{postFormFields}</div>
          </Container>
        </Col>
        <Col>
          <Container></Container>
        </Col>
      </Row>
    </Form>
  );
};

export default CreatePost;
