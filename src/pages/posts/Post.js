import React from "react";
import styles from "../../styles/Post.module.css";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    title,
    content,
    image,
    category,
    reation_id,
    reactions_count,
    comment_count,
    crown_count,
    good_count,
    love_count,
    updated_on,
  } = props;
  return <div>POST PLACEHOLDER</div>;
};

export default Post;
