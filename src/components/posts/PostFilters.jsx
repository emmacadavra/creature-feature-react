import React from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "../../styles/Posts.module.css";
import search from "../../assets/search.png";
import { useAuth } from "../../contexts/AuthContext";

export const PostFilters = ({ query, onQueryChange, onFilterChange }) => {
  const { currentUser } = useAuth();
  const profile_id = currentUser?.profile_id || "";

  return (
    <Container>
      <Row>
        <Col>
          <Button
            onClick={() => {
              onFilterChange(`owner__followed__owner__profile=${profile_id}`);
            }}
          >
            My Feed
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              onFilterChange(
                `reactions__owner__profile=${profile_id}&ordering=-reactions__created_on`,
              );
            }}
          >
            My Faves
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => {}}>Fluffy Placeholder</Button>
        </Col>
        <Col>
          <Button onClick={() => {}}>Scaly Placeholder</Button>
        </Col>
        <Col>
          <Button onClick={() => {}}>Feathered Placeholder</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Image src={search} className={styles.SearchIcon} />
          <Form
            onSubmit={(event) => event.preventDefault()}
            className={styles.SearchBar}
          >
            <Form.Control
              type="text"
              value={query}
              onChange={onQueryChange}
              className="me-sm-2"
              placeholder="Search posts"
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
