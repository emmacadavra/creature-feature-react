import React from "react";
import Posts from "../components/posts/Posts";
import { Col, Container, Row } from "react-bootstrap";

const Homepage = () => {
  return (
    <Container>
      <Row>
        <Col>{/* Profile info */}</Col>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <Posts />
        </Col>
        <Col>{/* Popular profiles */}</Col>
      </Row>
    </Container>
  );
};

export default Homepage;
