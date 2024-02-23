import React, { useState } from "react";
import { PostFilters } from "./PostFilters";
import PostList from "./PostList";
import { Button } from "react-bootstrap";
import CreatePost from "./CreatePost";

const Posts = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);

  const toggleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };
  console.log(showCreatePost);
  return (
    <div>
      {showCreatePost && <CreatePost />}
      <Button onClick={toggleShowCreatePost}>CREATE POST</Button>
      <PostFilters />
      <PostList />
    </div>
  );
};

export default Posts;
