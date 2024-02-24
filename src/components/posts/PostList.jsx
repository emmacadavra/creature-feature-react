import React, { useEffect, useState } from "react";
import Post from "./Post";
import { axiosReq } from "../../api/axiosDefaults";
import { Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "../../styles/Posts.module.css";
import noResults from "../../assets/no_results.png";
import search from "../../assets/search.png";
import Asset from "../Asset";

const PostList = ({ message, filter = "" }) => {
  const [postsData, setPostsData] = useState({ results: [] });
  const [postsLoaded, setPostsLoaded] = useState(false);
  // const {pathname} = useLocation(); - react-router-dom
  // ^ above code suggested but used for different URLs
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        // 'filter' relating to filter prop that was entered into Routes
        setPostsData(data.results);
        setPostsLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    setPostsLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query]);
  // ^ above, tutorial suggests [filter, pathname], relating to useLocation()

  // if (!postsData) {
  //   return <>Loading...</>;
  // }

  return (
    <Container>
      <Row>
        <Col>
          <div>
            <Image src={search} className={styles.SearchIcon} />
            <Form
              onSubmit={(event) => event.preventDefault()}
              className={styles.SearchBar}
            >
              <Form.Control
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="me-sm-2"
                placeholder="Search posts"
              />
            </Form>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          {postsLoaded ? (
            <>
              {postsData.length ? (
                postsData.map((post) => {
                  return (
                    <Post {...post} key={post.id} setPostsData={setPostsData} />
                  );
                })
              ) : (
                <Container>
                  <Asset src={noResults} message={message} />
                </Container>
              )}
            </>
          ) : (
            <Container>
              <Asset spinner />
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PostList;
