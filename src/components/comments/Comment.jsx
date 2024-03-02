import React from "react";
import styles from "../../styles/Comment.module.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { useAuth } from "../../contexts/AuthContext";
import { MoreDropdown } from "../MoreDropdown";
import { axiosResp } from "../../api/axiosDefaults";

const Comment = (props) => {
  const {
    id,
    owner,
    profileId,
    profileImage,
    content,
    updatedOn,
    setPostsData,
    setCommentsData,
  } = props;

  const { currentUser } = useAuth();
  const isOwner = currentUser?.username === owner;
  console.log(currentUser);
  console.log("Is Owner?:", isOwner);

  const handleDelete = async () => {
    try {
      await axiosResp.delete(`comments/${id}/`);
      setPostsData((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));
      setCommentsData((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <hr />
      <Card>
        <Card.Body className="d-flex">
          <Link to={`/profiles/${profileId}`}>
            <Avatar src={profileImage} height={32} />
          </Link>
          <div className="align-self-center ms-2">
            <span className={styles.Owner}>{owner}</span>
            <span className={styles.Date}>{updatedOn}</span>
            <p>{content}</p>
          </div>
          {isOwner && (
            <div className="ms-auto">
              <MoreDropdown handleEdit={() => {}} handleDelete={handleDelete} />
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Comment;
