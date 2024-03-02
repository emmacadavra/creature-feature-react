import React, { useState } from "react";
import styles from "../../styles/Post.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Card, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../Avatar";
import ReactionsBar from "./ReactionsBar";
import { MoreDropdown } from "./MoreDropdown";
import { axiosResp } from "../../api/axiosDefaults";
import { getComments } from "../../api/comments";
import CreateComment from "../comments/CreateComment";
import commentsImg from "../../assets/comments.png";

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
    setPostsData,
    updatedOn,
  } = props;

  const { currentUser } = useAuth();
  const isOwner = currentUser?.username === owner;

  const currentUserProfileImage = currentUser?.profileImage;

  const [comments, setComments] = useState({ results: [] });
  const [showComments, setShowComments] = useState(false);

  const toggleShowComments = () => {
    setShowComments(!showComments);
  };

  // edit & delete post code below
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosResp.delete(`posts/${id}/`);
      navigate("/");
      // NEED TO AMEND THIS
    } catch (err) {
      console.error(err);
    }
  };

  // end of edit & delete code

  return (
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
            <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
          )}
        </div>
      </Card.Body>
      <Card.Img src={image} alt={title} />
      <div className="d-flex justify-content-between">
        <ReactionsBar
          postId={id}
          isOwner={isOwner}
          currentUserReaction={currentUserReaction}
          crownCount={crownCount}
          goodCount={goodCount}
          loveCount={loveCount}
        />

        <span>
          <Image src={commentsImg} onClick={toggleShowComments} fluid />
          {commentCount}
        </span>
      </div>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
      </Card.Body>
      {currentUser ? (
        <CreateComment
          post={id}
          profileId={currentUser.profileId}
          profileImage={currentUserProfileImage}
          setPostsData={setPostsData}
          setComments={setComments}
        />
      ) : comments.results.length ? (
        "Comments"
      ) : null}
    </Card>
  );
};

export default Post;
