import React, { useState } from "react";
import styles from "./Post.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import ReactionsBar from "./ReactionsBar";
import { MoreDropdown } from "../MoreDropdown";
import commentsImg from "../../assets/comments.png";
import Comments from "../comments/Comments";
import CreateEditPost from "./CreateEditPost";

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
    commentCount,
    updatedOn,
    onPostEdit,
    onPostDelete,
  } = props;

  const { currentUser } = useAuth();

  const [showComments, setShowComments] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const isOwner = currentUser?.username === owner;

  const handleEdit = async (postId, editPostData) => {
    await onPostEdit(postId, editPostData);
    setEditPost(false);
  };

  const toggleShowComments = () => {
    setShowComments(!showComments);
  };

  return (
    <>
      {editPost ? (
        <CreateEditPost
          onPostEdit={handleEdit}
          onPostCancel={() => {
            setEditPost(false);
          }}
          postId={id}
          defaultTitle={title}
          defaultContent={content}
          defaultImage={image}
          defaultCategory={category}
        />
      ) : (
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
              {isOwner && (
                <MoreDropdown
                  onEdit={() => {
                    setEditPost(true);
                  }}
                  onDelete={() => {
                    onPostDelete(id);
                  }}
                />
              )}
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
          <div>
            <Button
              onClick={toggleShowComments}
              className={styles.CommentsButton}
            >
              <img src={commentsImg} />
            </Button>
            {commentCount} comments
          </div>
          {showComments && <Comments postId={id} />}
        </Card>
      )}
    </>
  );
};

export default Post;
