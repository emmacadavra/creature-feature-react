import React, { useEffect, useState } from "react";
import Asset from "../Asset";
import Comment from "../comments/Comment";
import CreateEditComment from "./CreateEditComment";
import { Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import {
  createComment,
  deleteComment,
  editComment,
  getComments,
} from "../../api/comments";

const Comments = ({ postId }) => {
  const { currentUser } = useAuth();
  const [commentsData, setCommentsData] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [appendComments, setAppendComments] = useState(false);

  // TODO: update UseAuth to transform to camelCase
  const profileId = currentUser?.profile_id;
  const profileImage = currentUser?.profile_image;

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments(postId);
      setCommentsData(
        appendComments ? [...commentsData, ...data.results] : data.results,
      );
      setCommentsLoaded(true);
      setAppendComments(false);
    };
    setCommentsLoaded(!appendComments ? false : true);
    fetchComments();
  }, [postId]);

  const handleCreate = async (postId, commentData) => {
    const newComment = await createComment(postId, commentData);
    setCommentsData([newComment, ...commentsData]);
  };

  const handleEdit = async (commentId, commentData) => {
    const editedComment = await editComment(commentId, commentData);
    const index = commentsData.findIndex((comment) => {
      return comment.id === commentId;
    });
    commentsData[index] = editedComment;
    setCommentsData([...commentsData]);
  };

  const handleDelete = async (commentId) => {
    await deleteComment(commentId);
    setCommentsData(commentsData.filter((comment) => comment.id !== commentId));
  };

  return (
    <div>
      {currentUser && (
        <CreateEditComment
          postId={postId}
          profileId={profileId}
          profileImage={profileImage}
          onCommentCreate={handleCreate}
        />
      )}
      {commentsLoaded ? (
        <>
          {commentsData.length ? (
            commentsData.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  owner={comment.owner}
                  profileId={comment.profileId}
                  profileImage={comment.profileImage}
                  content={comment.content}
                  likeId={comment.likeId}
                  likesCount={comment.likesCount}
                  updatedOn={comment.updatedOn}
                  onCommentEdit={handleEdit}
                  onCommentDelete={handleDelete}
                />
              );
            })
          ) : currentUser ? (
            <span>No comments to display... Why not be the first?</span>
          ) : (
            <span>No comments to display.</span>
          )}
        </>
      ) : (
        <Container>
          <Asset spinner />
        </Container>
      )}
    </div>
  );
};

export default Comments;
