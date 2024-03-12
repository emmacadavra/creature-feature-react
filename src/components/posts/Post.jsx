import React, { useState } from "react";
import styles from "./Post.module.css";
import appStyles from "../../App.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import ReactionsBar from "./ReactionsBar";
import { MoreDropdown } from "../MoreDropdown";
import commentsImg from "../../assets/comments.png";
import Comments from "../comments/Comments";
import CreateEditPost from "./CreateEditPost";

const Post = ({
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
}) => {
  const { currentUser } = useAuth();

  const [showComments, setShowComments] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const isOwner = currentUser?.username === owner;

  const getCategoryStyling = (category) => {
    if (category === "Reptillian Villains") {
      return (
        <div
          className={`${styles.CategoryTag} ${styles.ScalyCategory} text-center`}
        >
          <small>{category}</small>
        </div>
      );
    } else if (category === "Feathered Fiends") {
      return (
        <div
          className={`${styles.CategoryTag} ${styles.FeatheredCategory} text-center`}
        >
          <small>{category}</small>
        </div>
      );
    } else {
      return (
        <div
          className={`${styles.CategoryTag} ${styles.FluffyCategory} text-center`}
        >
          <small>{category}</small>
        </div>
      );
    }
  };

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
            <Link to={`/profiles/${profileId}`} className={appStyles.PageLink}>
              <Avatar src={profileImage} height={55} />
              {owner}
            </Link>
            <div className="d-flex flex-column justify-content-between">
              {isOwner && (
                <div className={`${styles.PostMeatballs} text-end`}>
                  <MoreDropdown
                    onEdit={() => {
                      setEditPost(true);
                    }}
                    onDelete={() => {
                      onPostDelete(id);
                    }}
                  />
                </div>
              )}
              <div>{updatedOn}</div>
            </div>
          </Card.Body>
          <Card.Img src={image} alt={title} />
          <div
            className={`d-flex justify-content-center align-items-center ${styles.ReactionsBar}`}
          >
            <ReactionsBar
              postId={id}
              isOwner={isOwner}
              currentUserReaction={currentUserReaction}
              crownCount={crownCount}
              goodCount={goodCount}
              loveCount={loveCount}
            />
            {category && getCategoryStyling(category)}
          </div>
          <Card.Body>
            {title && <Card.Title className="text-center">{title}</Card.Title>}
            {content && <Card.Text>{content}</Card.Text>}
          </Card.Body>
          <div className="d-block ms-auto">
            <small>{commentCount} comments</small>
            <Button
              onClick={toggleShowComments}
              className={styles.CommentsButton}
            >
              <img src={commentsImg} className={styles.CommentsButtonImg} />
            </Button>
          </div>
          {showComments && <Comments postId={id} />}
        </Card>
      )}
    </>
  );
};

export default Post;
