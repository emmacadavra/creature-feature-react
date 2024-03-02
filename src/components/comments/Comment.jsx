import React from "react";
import styles from "../../styles/Comment.module.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";

const Comment = (props) => {
  const { owner, profileId, profileImage, content, updatedOn } = props;

  return (
    <div>
      <hr />
      <Card>
        <Card.Img>
          <Link to={`/profiles/${profileId}`}>
            <Avatar src={profileImage} height={32} />
          </Link>
        </Card.Img>
        <Card.Body>
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updatedOn}</span>
          <p>{content}</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Comment;
