import React, { useEffect, useState } from "react";
import Post from "./Post";
import { axiosReq } from "../../api/axiosDefaults";
import { Col, Container, Row } from "react-bootstrap";
import noResults from "../../assets/no_results.png";
import Asset from "../Asset";

const PostList = ({ message, filter = "" }) => {
  const [postsData, setPostsData] = useState({ results: [] });
  const [postsLoaded, setPostsLoaded] = useState(false);
  // const {pathname} = useLocation(); - react-router-dom
  // ^ above code suggested but used for different URLs

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}`);
        // 'filter' relating to filter prop that was entered into Routes
        setPostsData(data.results);
        setPostsLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    setPostsLoaded(false);
    fetchPosts();
  }, [filter]);
  // ^ above, tutorial suggests [filter, pathname], relating to useLocation()

  // if (!postsData) {
  //   return <>Loading...</>;
  // }

  return (
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
  );
};

export default PostList;
