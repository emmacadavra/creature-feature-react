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
    setSearchParams({ ...searchParamsObj, search: event.target.value });
  };

  const debouncedHandleQueryChange = debounce(handleQueryChange, 300);

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
            className={`${appStyles.IconLink} ${styles.FilterButton}`}
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
            className={`${appStyles.IconLink} ${styles.FilterButton}`}
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
            className={`${appStyles.IconLink} ${styles.CategoryFilterButton} ${styles.FluffyCategoryFilter}`}
          >
            <small>Facinorous Fluffballs</small>
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
            className={`${appStyles.IconLink} ${styles.CategoryFilterButton} ${styles.ScalyCategoryFilter}`}
          >
            <small>Reptillian Villains</small>
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
            className={`${appStyles.IconLink} ${styles.CategoryFilterButton} ${styles.FeatheredCategoryFilter}`}
          >
            <small>Feathered Fiends</small>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Image src={search} className={styles.SearchIcon} alt="Search" />
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
