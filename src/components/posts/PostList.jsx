import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Col, Container, Row } from "react-bootstrap";
import noResults from "../../assets/no_results.png";
import Asset from "../Asset";
import { getPosts } from "../../api/posts";

const PostList = ({ message, filter = "", query }) => {
  const [postsData, setPostsData] = useState({ results: [] });
  const [postsLoaded, setPostsLoaded] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPostsData(data);
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

  return (
    <Container>
      <Row>
        <Col>
          {postsLoaded ? (
            <>
              {postsData.length ? (
                postsData.map((post) => {
                  return (
                    <Post
                      id={post.id}
                      owner={post.owner}
                      profileId={post.profileId}
                      profileImage={post.profileImage}
                      title={post.title}
                      content={post.content}
                      image={post.image}
                      category={post.category}
                      updatedOn={post.updatedOn}
                      key={post.id}
                      setPostsData={setPostsData}
                    />
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
