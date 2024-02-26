import React from "react";
import styles from "../../styles/Post.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";

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
    reaction_id,
    comment_count,
    crown_count,
    good_count,
    love_count,
    updated_on,
  } = props;

  const currentUser = useAuth();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Post}>
      <Card.Body className="align-items-center justify-content-between">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={55} />
          {owner}
        </Link>
        <div className="d-flex align-items-center">
          <span>{updated_on}</span>
          {is_owner && "..."}
        </div>
      </Card.Body>
      <Card.Img src={image} alt={title} />
      {/* INSERT REACTIONS BAR W/ REACTION COUNTS ETC */}
      <Card.Body>
        {category && <Card.Text>{category}</Card.Text>}
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default Post;
