import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: post } = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        setPost({ results: [post] });
        console.log(post);
      } catch (err) {
        console.error(err);
      }
    };
    handleMount();
  }, []);

  return (
    <Row>
      <Col>
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container>Comments</Container>
      </Col>
    </Row>
  );
};

export default PostPage;
