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
  const { data } = await axiosReq.get(`/comments/?post=${postId}`);

  return {
    hasMorePages: data.next ? true : false,
    results: data.results.map((comment) => {
      return transformCommentData(comment);
    }),
  };
};

export const createComment = async (postId, newCommentData) => {
  const { data: newComment } = await axiosReq.post("/comments/", {
    post: postId,
    ...newCommentData,
  });
  return transformCommentData(newComment);
};

export const editComment = async (commentId, editCommentData) => {
  const { data: editedComment } = await axiosReq.put(
    `/comments/${commentId}/`,
    editCommentData,
  );
  return transformCommentData(editedComment);
};

export const deleteComment = async (commentId) => {
  return axiosReq.delete(`comments/${commentId}/`);
};
