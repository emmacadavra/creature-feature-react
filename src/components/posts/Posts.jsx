import React, { useState } from "react";
import { PostFilters } from "./PostFilters";
import PostList from "./PostList";
import { Button, Col, Container, Row } from "react-bootstrap";
import CreatePost from "./CreatePost";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Posts.module.css";
import appStyles from "../../App.module.css";
import newPost from "../../assets/new_post.png";

const Posts = () => {
  const { currentUser } = useAuth();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);

  const toggleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };

  return (
    <Container className="d-flex flex-column justify-content-center">
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          {currentUser && (
            <Button
              onClick={toggleShowCreatePost}
              className={`${appStyles.IconLink} ${styles.CreateButton}`}
            >
              <img
                src={newPost}
                alt="Create new post"
                height="38"
                className={appStyles.Icon}
              />
              Create Post
            </Button>
          )}
          {showCreatePost && <CreatePost />}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          {currentUser && (
            <PostFilters
              value={query}
              onQueryChange={(query) => setQuery(query)}
              onFilterChange={(filter) => {
                setFilter(filter);
              }}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          <PostList
            filter={filter}
            query={query}
            message="No results found. Try adjusting the search keywords!"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Posts;
