import React from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "../../styles/PostFilters.module.css";
import appStyles from "../../App.module.css";
import search from "../../assets/search.png";
import { useAuth } from "../../contexts/AuthContext";
import debounce from "debounce";
import myFeed from "../../assets/my_feed.png";
import myFaves from "../../assets/my_faves.png";

export const PostFilters = ({ query, onQueryChange, onFilterChange }) => {
  const { currentUser } = useAuth();
  const profile_id = currentUser?.profile_id || "";

  const handleQueryChange = (event) => {
    onQueryChange(event.target.value);
  };

  const debouncedHandleQueryChange = debounce(handleQueryChange, 300);

  return (
    <Container>
      <Row>
        <Col xs={6}>
          <Button
            onClick={() => {
              onFilterChange(`owner__followed__owner__profile=${profile_id}`);
            }}
            className={`${styles.FilterButton}`}
          >
            <img
              src={myFeed}
              alt="My Feed"
              height="38"
              className={appStyles.Icon}
            />
            My Feed
          </Button>
        </Col>
        <Col xs={6}>
          <Button
            onClick={() => {
              onFilterChange(
                `reactions__owner__profile=${profile_id}&ordering=-reactions__created_on`,
              );
            }}
            className={`${styles.FilterButton}`}
          >
            <img
              src={myFaves}
              alt="My Faves"
              height="38"
              className={appStyles.Icon}
            />
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
              onChange={debouncedHandleQueryChange}
              className="me-sm-2"
              placeholder="Search posts"
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
