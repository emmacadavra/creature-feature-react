import React, { useEffect, useState } from "react";
import Post from "./Post";
import { axiosReq } from "../../api/axiosDefaults";
import { Col, Container, Row } from "react-bootstrap";
import noResults from "../../assets/no_results.png";
import Asset from "../Asset";

const PostList = ({ message, filter = "", query }) => {
  const [postsData, setPostsData] = useState({ results: [] });
  const [postsLoaded, setPostsLoaded] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(
          `/posts/?filter=${filter}&search=${query}`,
        );
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

  return (
    <Container>
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
