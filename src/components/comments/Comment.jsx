import React, { useState } from "react";
import styles from "./Comment.module.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { useAuth } from "../../contexts/AuthContext";
import { MoreDropdown } from "../MoreDropdown";
import EditComment from "./EditComment";

const Comment = ({
  id,
  owner,
  profileId,
  profileImage,
  content,
  updatedOn,
  onCommentDelete,
}) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { currentUser } = useAuth();
  const isOwner = currentUser?.username === owner;

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
            {showEditForm ? (
              <EditComment
                id={id}
                profile_id={profileId}
                content={content}
                profileImage={profileImage}
                setShowEditForm={setShowEditForm}
              />
            ) : (
              <p>{content}</p>
            )}
          </div>
          {isOwner && (
            <div className="ms-auto">
              <MoreDropdown
                onEdit={() => setShowEditForm(true)}
                onDelete={() => {
                  onCommentDelete(id);
                }}
              />
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Comment;
