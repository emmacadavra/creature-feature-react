import React, { useEffect, useRef } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "./PostFilters.module.css";
import appStyles from "../../App.module.css";
import search from "../../assets/search.png";
import { useAuth } from "../../contexts/AuthContext";
import debounce from "debounce";
import myFeed from "../../assets/my_feed.png";
import myFaves from "../../assets/my_faves.png";
import { useSearchParams } from "react-router-dom";

export const PostFilters = () => {
  const { currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsObj = Object.fromEntries(searchParams.entries());
  const profileId = currentUser?.profile_id || "";

  // Keep the search input field in sync with the URL
  const inputRef = useRef(null);
  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    if (searchParamsObj.search === undefined) {
      inputRef.current.value = "";
    } else {
      inputRef.current.value = searchParamsObj.search;
    }
  }, [searchParamsObj.search]);

  const handleQueryChange = (event) => {
    console.log(event);
    setSearchParams({ ...searchParamsObj, search: event.target.value });
  };

  const debouncedHandleQueryChange = debounce(handleQueryChange, 300);
  console.log(profileId);

  return (
    <Container>
      <Row>
        <Col xs={6}>
          <Button
            onClick={() => {
              setSearchParams({
                owner__followed__owner__profile: profileId,
              });
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
              setSearchParams({
                reactions__owner__profile: profileId,
                ordering: "-reactions__created_on",
              });
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
          <Button
            onClick={() => {
              setSearchParams({
                ...searchParamsObj,
                category: "Facinorous Fluffballs",
              });
            }}
          >
            Facinorous Fluffballs
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              setSearchParams({
                ...searchParamsObj,
                category: "Reptillian Villains",
              });
            }}
          >
            Reptillian Villains
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              setSearchParams({
                ...searchParamsObj,
                category: "Feathered Fiends",
              });
            }}
          >
            Feathered Fiends
          </Button>
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
              ref={inputRef}
              type="text"
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
