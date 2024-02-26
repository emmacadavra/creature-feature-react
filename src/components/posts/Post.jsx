import React from "react";
import styles from "../../styles/Post.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import ReactionsBar from "./ReactionsBar";
// import { axiosResp } from "../../api/axiosDefaults";

const Post = (props) => {
  // const {
  //   id,
  //   owner,
  //   profileId,
  //   profileImage,
  //   title,
  //   content,
  //   image,
  //   category,
  //   reactionId,
  //   commentCount,
  //   crownCount,
  //   goodCount,
  //   loveCount,
  //   updatedOn,
  // } = props;

  const {
    owner,
    profileId,
    profileImage,
    title,
    content,
    image,
    category,
    updatedOn,
  } = props;

  const currentUser = useAuth();
  const is_owner = currentUser?.username === owner;

  // const handleReaction = async () => {
  //   try {
  //     const { data } = await axiosResp.post("/reactions/", { post: id });
  //     setPostsData((prevPostsData) => ({
  //       ...prevPostsData,
  //       results: prevPostsData.results.map((post) => {
  //         // return post.id === id? {...post, likes_count: post.likes_count + 1, like_id: data.id}
  //       }),
  //     }));
  //   } catch (err) {}
  // };

  return (
    <Card className={styles.Post}>
      <Card.Body className="align-items-center justify-content-between">
        <Link to={`/profiles/${profileId}`}>
          <Avatar src={profileImage} height={55} />
          {owner}
        </Link>
        <div className="d-flex align-items-center">
          <span>{updatedOn}</span>
          {/* NOTE: BELOW TEXT NOT SHOWING */}
          {is_owner && "..."}
        </div>
      </Card.Body>
      <Card.Img src={image} alt={title} />
      <ReactionsBar />
      <Card.Body>
        {category && <Card.Text>{category}</Card.Text>}
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default Post;
