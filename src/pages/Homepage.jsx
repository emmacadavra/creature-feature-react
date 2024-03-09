import React from "react";
import Posts from "../components/posts/Posts";
import { Col, Container, Row } from "react-bootstrap";
import PopularProfiles from "../components/profiles/PopularProfiles";

const Homepage = () => {
  return (
    <Container>
      <Row>
        <Col lg={3}>
          <PopularProfiles mobile />
          {/* Profile info */}
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={6}>
          <Posts />
        </Col>
        <Col lg={3}>
          <PopularProfiles />
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
