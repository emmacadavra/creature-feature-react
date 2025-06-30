import { axiosReq } from "./axiosDefaults";

const transformLikeCommentData = (like) => {
  return {
    id: like.id,
    owner: like.owner_id,
    commentId: like.comment_id,
    createdOn: like.created_on,
  };
};

export const createLikeComment = async (userId, commentId) => {
  try {
    const { data: newLikeComment } = await axiosReq.post(
      "http://localhost:4000/like-comments",
      {
        owner: userId,
        comment: commentId,
      },
    );
    return transformLikeCommentData(newLikeComment);
  } catch (error) {
    throw new Error(`Failed to createReaction(): ${error}`);
  }
};

export const deleteLikeComment = async (likeId) => {
  try {
    await axiosReq.delete(`http://localhost:4000/like-comments/${likeId}`);
  } catch (error) {
    throw new Error(`Failed to deleteLike(): ${error}`);
  }
};
