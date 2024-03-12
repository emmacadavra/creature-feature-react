import React, { useState } from "react";
import styles from "./Comment.module.css";
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { useAuth } from "../../contexts/AuthContext";
import { MoreDropdown } from "../MoreDropdown";
import CreateEditComment from "./CreateEditComment";
import { createLikeComment, deleteLikeComment } from "../../api/likeComments";
import likeCommentDefault from "../../assets/like.png";
import likeCommentHighlight from "../../assets/like_highlight.png";

const Comment = ({
  id,
  owner,
  profileId,
  profileImage,
  content,
  likeId,
  likesCount,
  updatedOn,
  onCommentEdit,
  onCommentDelete,
}) => {
  const [commentLiked, setCommentLiked] = useState(likeId);
  const [likeCommentCount, setLikeCommentCount] = useState(likesCount);
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
      setLikeCommentCount(likeCommentCount - 1);
    } else if (currentUser && isOwner === false) {
      const newLikeComment = await createLikeComment(userId, id);
      setCommentLiked(newLikeComment);
      setLikeCommentCount(likeCommentCount + 1);
    }
  };

  return (
    <div>
      <hr />
      <Card>
        <Card.Body className="d-flex justify-content-between">
          <div className="align-self-center">
            <Link to={`/profiles/${profileId}`}>
              <Avatar src={profileImage} height={44} />
            </Link>
          </div>
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

          {!currentUser ? (
            <div className="align-self-center">
              <OverlayTrigger
                overlay={<Tooltip>Please log in to like a comment!</Tooltip>}
                placement="left"
              >
                <div>
                  <Button
                    aria-label="Like comment"
                    className={styles.LikeCommentButton}
                  >
                    <img src={likeCommentDefault} />
                  </Button>
                  {likesCount}
                </div>
              </OverlayTrigger>
            </div>
          ) : isOwner ? (
            <>
              <div className="text-end">
                <MoreDropdown
                  onEdit={() => setEditComment(true)}
                  onDelete={() => {
                    onCommentDelete(id);
                  }}
                />
                <OverlayTrigger
                  overlay={
                    <Tooltip>You can&apos;t like your own comments!</Tooltip>
                  }
                  placement="left"
                >
                  <div>
                    <Button
                      onClick={handleLikeComment}
                      aria-label="Like comment"
                      className={styles.LikeCommentButton}
                    >
                      <img src={likeCommentDefault} />
                    </Button>
                    {likesCount}
                  </div>
                </OverlayTrigger>
              </div>
            </>
          ) : (
            <div>
              <Button
                onClick={handleLikeComment}
                aria-label="Like comment"
                className={styles.LikeCommentButton}
              >
                {likeId ? (
                  <img src={likeCommentHighlight} />
                ) : (
                  <img src={likeCommentDefault} />
                )}
              </Button>
              {likesCount}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Comment;
