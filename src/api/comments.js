import { axiosReq } from "./axiosDefaults";

const transformCommentData = (comment) => {
  return {
    id: comment.id,
    owner: comment.owner,
    isOwner: comment.is_owner,
    postId: comment.post,
    content: comment.content,
    profileId: comment.profile_id,
    profileImage: comment.profile_image,
    likeId: comment.like_id,
    likesCount: comment.likes_count,
    createdOn: comment.created_on,
    updatedOn: comment.updated_on,
  };
};

export const getComments = async (postId) => {
  const { data: commentsData } = await axiosReq.get(
    `/comments/?post=${postId}`,
  );

  return {
    hasMorePages: commentsData.next ? true : false,
    results: commentsData.results.map((comment) => {
      return transformCommentData(comment);
    }),
  };
};

export const createComment = async (content, postId) => {
  const { data: newComment } = await axiosReq.post("/comments/", {
    content: content,
    post: postId,
  });
  return newComment;
};

export const deleteComment = async (commentId) => {
  return axiosReq.delete(`comments/${commentId}/`);
};
