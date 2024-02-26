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
    id,
    owner,
    profileId,
    profileImage,
    title,
    content,
    image,
    category,
    crownCount,
    goodCount,
    loveCount,
    updatedOn,
  } = props;

  const { currentUser } = useAuth();
  const isOwner = currentUser?.username === owner;

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
          {isOwner && "..."}
        </div>
      </Card.Body>
      <Card.Img src={image} alt={title} />
      <ReactionsBar
        postId={id}
        isOwner={isOwner}
        crownCount={crownCount}
        goodCount={goodCount}
        loveCount={loveCount}
      />
      <Card.Body>
        {category && <Card.Text>{category}</Card.Text>}
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default Post;
