import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import Avatar from "../Avatar";
import appStyles from "../../App.module.css";

const CreateEditComment = ({
  onCommentCreate,
  onCommentEdit,
  commentId,
  postId,
  profileImage,
  defaultContent = "",
}) => {
  const [comment, setComment] = useState(defaultContent);

  const handleChange = (event) => {
    setComment({
      ...comment,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (commentId) {
      onCommentEdit(commentId, comment);
      setComment(defaultContent);
    } else {
      onCommentCreate(postId, comment);
      setComment(defaultContent);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <div className="m-2">
            <Avatar src={profileImage} height={48} />
          </div>
          <Form.Control
            placeholder="Leave a comment..."
            as="textarea"
            name="content"
            value={comment ?? ""}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <Button
        className={`${appStyles.Button} ${appStyles.TurquoiseButton} d-block ms-auto`}
        disabled={!comment}
        type="submit"
      >
        Post Comment
      </Button>
    </Form>
  );
};

export default CreateEditComment;
