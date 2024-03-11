import React, { useState } from "react";
import styles from "./Comment.module.css";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { useAuth } from "../../contexts/AuthContext";
import { MoreDropdown } from "../MoreDropdown";
import CreateEditComment from "./CreateEditComment";
import { createLikeComment, deleteLikeComment } from "../../api/likeComments";

const Comment = ({
  id,
  owner,
  profileId,
  profileImage,
  content,
  likeId,
  updatedOn,
  onCommentEdit,
  onCommentDelete,
}) => {
  const [commentLiked, setCommentLiked] = useState(likeId);
  const [likeCommentCount, setLikeCommentCount] = useState();
  const [editComment, setEditComment] = useState(false);
  const { currentUser } = useAuth();
  const userId = currentUser?.profile_id;
  const isOwner = currentUser?.username === owner;

  const handleEdit = async (commentId, editCommentData) => {
    await onCommentEdit(commentId, editCommentData);
    setEditComment(false);
  };

  const handleLikeComment = async () => {
    if (commentLiked) {
      await deleteLikeComment(likeId);
      setCommentLiked(null);
      setLikeCommentCount(...(likeCommentCount - 1));
    } else if (currentUser && isOwner === false) {
      const newLikeComment = await createLikeComment(userId, id);
      setCommentLiked(newLikeComment);
      setLikeCommentCount(...(likeCommentCount - 1));
    }
    // else {
    //   setShow(!show);
    // }
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
            {editComment ? (
              <CreateEditComment
                onCommentEdit={handleEdit}
                commentId={id}
                profileId={profileId}
                profileImage={profileImage}
                defaultContent={content}
              />
            ) : (
              <p>{content}</p>
            )}
          </div>
          {isOwner && (
            <div className="ms-auto">
              <MoreDropdown
                onEdit={() => setEditComment(true)}
                onDelete={() => {
                  onCommentDelete(id);
                }}
              />
            </div>
          )}
          <Button onClick={handleLikeComment}>LIKE</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Comment;
