import React from "react";
import styles from "../../styles/Post.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import crownDefault from "../../assets/crown.png";
import crownGreyscale from "../../assets/crown_greyscale.png";
import crownHighlight from "../../assets/crown_highlight.png";
import goodDefault from "../../assets/good.png";
import goodGreyscale from "../../assets/good_greyscale.png";
import goodHighlight from "../../assets/good_highlight.png";
import loveDefault from "../../assets/love.png";
import loveGreyscale from "../../assets/love_greyscale.png";
import loveHighlight from "../../assets/love_highlight.png";
import commentsImg from "../../assets/comments.png";
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
      <div>
        {is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You can&apos;t react to your own posts!</Tooltip>}
          >
            <span>
              <img src={crownDefault} className={styles.Reactions} />
              {crown_count}
              <img src={goodDefault} className={styles.Reactions} />
              {good_count}
              <img src={loveDefault} className={styles.Reactions} />
              {love_count}
            </span>
          </OverlayTrigger>
        ) : reaction_id ? (
          <span onClick={() => {}}>
            <img src={crownHighlight} className={styles.Reactions} />
            {crown_count}
            <img src={goodHighlight} className={styles.Reactions} />
            {good_count}
            <img src={loveHighlight} className={styles.Reactions} />
            {love_count}
          </span>
        ) : currentUser ? (
          <span onClick={() => {}}>
            <img src={crownDefault} className={styles.Reactions} />
            {crown_count}
            <img src={goodDefault} className={styles.Reactions} />
            {good_count}
            <img src={loveDefault} className={styles.Reactions} />
            {love_count}
          </span>
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>You must be logged in to react to posts!</Tooltip>
            }
          >
            <img src={crownGreyscale} className={styles.Reactions} />
            {crown_count}
            <img src={goodGreyscale} className={styles.Reactions} />
            {good_count}
            <img src={loveGreyscale} className={styles.Reactions} />
            {love_count}
          </OverlayTrigger>
        )}
        <Link to={`/posts/${id}`}>
          <img src={commentsImg} className={styles.Reactions} />
          {comment_count}
        </Link>
      </div>
      <Card.Body>
        {category && <Card.Text>{category}</Card.Text>}
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default Post;
