import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import Avatar from "../Avatar";
import styles from "../../styles/CreateEditComment.module.css";

const CreateComment = ({
  postId,
  profileImage,
  profileId,
  onCommentCreate,
}) => {
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <Form
      className="mt-2"
      onSubmit={() => {
        onCommentCreate(content, postId);
      }}
    >
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profileId}`}>
            <Avatar src={profileImage} height={32} />
          </Link>
          <Form.Control
            placeholder="Leave a comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        Post Comment
      </button>
    </Form>
  );
};

export default CreateComment;
