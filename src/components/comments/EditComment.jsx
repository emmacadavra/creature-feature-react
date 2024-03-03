import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { axiosResp } from "../../api/axiosDefaults";
import styles from "../../styles/CreateEditComment.module.css";

const EditComment = (props) => {
  const { id, content, setShowEditForm, setCommentsData } = props;
  const [commentContent, setCommentContent] = useState(content);

  const handleChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosResp.put(`/comments/${id}/`, {
        content: commentContent.trim(),
      });
      setCommentsData((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: commentContent.trim(),
                updated_on: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={commentContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
};

export default EditComment;
