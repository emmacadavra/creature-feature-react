import React, { useState } from "react";
import { PostFilters } from "./PostFilters";
import PostList from "./PostList";
import { Button, Col, Container, Row } from "react-bootstrap";
import CreatePost from "./CreatePost";
import { useAuth } from "../../contexts/AuthContext.js";
import styles from "../../styles/Posts.module.css";
import appStyles from "../../App.module.css";
import newpost from "../../assets/newpost.png";

const Posts = () => {
  const { currentUser } = useAuth();

  const [showCreatePost, setShowCreatePost] = useState(false);

  const toggleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };

  const newPostButton = (
    <Button
      onClick={toggleShowCreatePost}
      className={`${appStyles.IconLink} ${styles.CreateButton}`}
    >
      <img
        src={newpost}
        alt="Create new post"
        height="38"
        className={appStyles.Icon}
      />
      Create Post
    </Button>
  );

  return (
    <Container className="d-flex flex-column justify-content-center">
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          {currentUser && newPostButton}
          {showCreatePost && <CreatePost />}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          <PostFilters />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          <PostList />
        </Col>
      </Row>
    </Container>
  );
};

export default Posts;
