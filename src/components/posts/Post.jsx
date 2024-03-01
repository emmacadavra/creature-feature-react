import React from "react";
import styles from "../../styles/Post.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import ReactionsBar from "./ReactionsBar";
import { MoreDropdown } from "./MoreDropdown";
// import { axiosResp } from "../../api/axiosDefaults";

const Post = (props) => {
  const {
    id,
    owner,
    profileId,
    profileImage,
    title,
    content,
    image,
    category,
    currentUserReaction,
    crownCount,
    goodCount,
    loveCount,
    updatedOn,
  } = props;

  const { currentUser } = useAuth();
  const isOwner = currentUser?.username === owner;

  return (
    <Card className={styles.Post}>
      <Card.Body className="d-flex align-items-center justify-content-between">
        <Link to={`/profiles/${profileId}`}>
          <Avatar src={profileImage} height={55} />
          {owner}
        </Link>
        <div className="d-flex align-items-center">
          <div>
            {category && (
              <Card.Text className="text-center">{category}</Card.Text>
            )}
            <span>{updatedOn}</span>
          </div>
          {isOwner && <MoreDropdown />}
        </div>
      </Card.Body>
      <Card.Img src={image} alt={title} />
      <ReactionsBar
        postId={id}
        isOwner={isOwner}
        currentUserReaction={currentUserReaction}
        crownCount={crownCount}
        goodCount={goodCount}
        loveCount={loveCount}
      />
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default Post;
