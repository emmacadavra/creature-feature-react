import { axiosReq } from "./axiosDefaults";

const transformLikeCommentData = (like) => {
  return {
    id: like.id,
    owner: like.owner,
    commentId: like.comment,
    createdOn: like.created_on,
  };
};

export const createLikeComment = async (userId, commentId) => {
  try {
    const { data: newLikeComment } = await axiosReq.post("/likes/", {
      owner: userId,
      comment: commentId,
    });
    return transformLikeCommentData(newLikeComment);
  } catch (error) {
    throw new Error(`Failed to createReaction(): ${error}`);
  }
};

export const deleteLikeComment = async (likeId) => {
  try {
    await axiosReq.delete(`/likes/${likeId}`);
  } catch (error) {
    throw new Error(`Failed to deleteLike(): ${error}`);
  }
};
