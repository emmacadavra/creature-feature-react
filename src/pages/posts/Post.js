import React from "react";
import styles from "../../styles/Post.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import crowndefault from "../../assets/crown.png";
import crowngreyscale from "../../assets/crown-greyscale.png";
import crownhighlight from "../../assets/crown-highlight.png";
import gooddefault from "../../assets/good.png";
import goodgreyscale from "../../assets/good-greyscale.png";
import goodhighlight from "../../assets/good-highlight.png";
import lovedefault from "../../assets/love.png";
import lovegreyscale from "../../assets/love-greyscale.png";
import lovehighlight from "../../assets/love-highlight.png";
import commentsimg from "../../assets/comments.png";
import Avatar from "../../components/Avatar";

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
    postPage,
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
          {is_owner && postPage && "..."}
        </div>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <div>
        {is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You can&apos;t react to your own posts!</Tooltip>}
          >
            <span>
              <img src={crowndefault} className={styles.Reactions} />
              {crown_count}
              <img src={gooddefault} className={styles.Reactions} />
              {good_count}
              <img src={lovedefault} className={styles.Reactions} />
              {love_count}
            </span>
          </OverlayTrigger>
        ) : reaction_id ? (
          <span onClick={() => {}}>
            <img src={crownhighlight} className={styles.Reactions} />
            {crown_count}
            <img src={goodhighlight} className={styles.Reactions} />
            {good_count}
            <img src={lovehighlight} className={styles.Reactions} />
            {love_count}
          </span>
        ) : currentUser ? (
          <span onClick={() => {}}>
            <img src={crowndefault} className={styles.Reactions} />
            {crown_count}
            <img src={gooddefault} className={styles.Reactions} />
            {good_count}
            <img src={lovedefault} className={styles.Reactions} />
            {love_count}
          </span>
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>You must be logged in to react to posts!</Tooltip>
            }
          >
            <img src={crowngreyscale} className={styles.Reactions} />
            {crown_count}
            <img src={goodgreyscale} className={styles.Reactions} />
            {good_count}
            <img src={lovegreyscale} className={styles.Reactions} />
            {love_count}
          </OverlayTrigger>
        )}
        <Link to={`/posts/${id}`}>
          <img src={commentsimg} className={styles.Reactions} />
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
