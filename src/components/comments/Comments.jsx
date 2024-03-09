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
import InfiniteScroll from "react-infinite-scroll-component";

const Comments = ({ postId }) => {
  const { currentUser } = useAuth();
  const [commentsData, setCommentsData] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [appendComments, setAppendComments] = useState(false);

  // TODO: update UseAuth to transform to camelCase
  const profileId = currentUser?.profile_id;
  const profileImage = currentUser?.profile_image;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(postId);
        setCommentsData(
          appendComments ? [...commentsData, ...data.results] : data.results,
        );
        setHasMorePages(data.hasMorePages);
        setCommentsLoaded(true);
        setAppendComments(false);
      } catch (err) {
        console.error(err);
      }
    };
    setCommentsLoaded(!appendComments ? false : true);
    fetchComments();
  }, [page]);

  const handleCreate = async (postId, commentData) => {
    try {
      const newComment = await createComment(postId, commentData);
      setCommentsData([newComment, ...commentsData]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (commentId, commentData) => {
    try {
      const editedComment = await editComment(commentId, commentData);
      const index = commentsData.findIndex((comment) => {
        return comment.id === commentId;
      });
      commentsData[index] = editedComment;
      setCommentsData([...commentsData]);
    } catch (err) {
      console.error(err);
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
            <InfiniteScroll
              dataLength={commentsData.length}
              loader={<Asset spinner />}
              hasMore={hasMorePages}
              next={() => {
                setPage(page + 1);
                setAppendComments(true);
              }}
            >
              {commentsData.map((comment) => {
                return (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    owner={comment.owner}
                    profileId={comment.profileId}
                    profileImage={comment.profileImage}
                    content={comment.content}
                    updatedOn={comment.updatedOn}
                    onCommentEdit={handleEdit}
                    onCommentDelete={handleDelete}
                  />
                );
              })}
            </InfiniteScroll>
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
