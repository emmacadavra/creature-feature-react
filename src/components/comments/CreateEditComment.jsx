import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import Avatar from "../Avatar";
import appStyles from "../../App.module.css";

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
          <div className="m-2">
            <Link to={`/profiles/${profileId}`}>
              <Avatar src={profileImage} height={48} />
            </Link>
          </div>
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
      <Button
        className={`${appStyles.Button} ${appStyles.TurquoiseButton} d-block ms-auto`}
        disabled={!commentData}
        type="submit"
      >
        Post Comment
      </Button>
    </Form>
  );
};

export default CreateEditComment;
