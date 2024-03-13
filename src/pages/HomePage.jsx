import React from "react";
import Posts from "../components/posts/Posts";
import { Col, Container, Row } from "react-bootstrap";
import PopularProfiles from "../components/profiles/PopularProfiles";
import MyProfile from "../components/profiles/MyProfile";

const Homepage = () => {
  return (
    <Container>
      <Row>
        <Col lg={0} xl={3}>
          <PopularProfiles mobile />
          <MyProfile />
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={8} xl={6}>
          <Posts />
        </Col>
        <Col lg={4} xl={3}>
          <PopularProfiles />
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
