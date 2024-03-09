import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import Avatar from "../Avatar";
import styles from "./CreateEditComment.module.css";

const CreateEditComment = ({
  onCommentCreate,
  onCommentEdit,
  commentId,
  postId,
  profileImage,
  profileId,
  defaultContent = "",
}) => {
  const [commentData, setCommentData] = useState({ content: defaultContent });

  const { content } = commentData;

  const handleChange = (event) => {
    setCommentData({
      ...commentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (commentId) {
      onCommentEdit(commentId, commentData);
    } else {
      onCommentCreate(postId, commentData);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profileId}`}>
            <Avatar src={profileImage} height={32} />
          </Link>
          <Form.Control
            placeholder="Leave a comment..."
            as="textarea"
            name="content"
            value={content ?? ""}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!commentData}
        type="submit"
      >
        Post Comment
      </button>
    </Form>
  );
};

export default CreateEditComment;
