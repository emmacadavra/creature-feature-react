import React, { useEffect, useState } from "react";
import Asset from "../Asset";
import Comment from "../comments/Comment";
import CreateComment from "../comments/CreateComment";
import { Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { createComment, deleteComment, getComments } from "../../api/comments";

const Comments = ({ postId }) => {
  const { currentUser } = useAuth();
  const [commentsData, setCommentsData] = useState({ results: [] });
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getComments(postId);
        setCommentsData(commentsData.results);
        setCommentsLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    setCommentsLoaded(false);
    fetchComments();
  }, []);

  const handleCreate = async (content, postId) => {
    try {
      const newComment = await createComment(content, postId);
      setCommentsData([newComment, ...commentsData]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setCommentsData(
        commentsData.filter((comment) => comment.id !== commentId),
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {currentUser && (
        <CreateComment
          postId={postId}
          profileId={currentUser.profileId}
          profileImage={currentUser?.profileImage}
          onCommentCreate={handleCreate}
        />
      )}
      {commentsLoaded ? (
        commentsData.length ? (
          commentsData.map((comment) => {
            return (
              <Comment
                key={comment.id}
                id={comment.id}
                owner={comment.owner}
                profileId={comment.profileId}
                profileImage={comment.profileImage}
                content={comment.content}
                updatedOn={comment.updatedOn}
                onCommentDelete={handleDelete}
              />
            );
          })
        ) : currentUser ? (
          <span>No comments to display... Why not be the first?</span>
        ) : (
          <span>No comments to display.</span>
        )
      ) : (
        <Container>
          <Asset spinner />
        </Container>
      )}
    </div>
  );
};

export default Comments;
