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
  try {
    const { data } = await axiosReq.get(
      `http://localhost:4000/comments/?post=${postId}`,
    );

    return {
      hasMorePages: data.next ? true : false,
      results: data.results.map((comment) => {
        return transformCommentData(comment);
      }),
    };
  } catch (error) {
    throw new Error(`Failed to getComments(): ${error}`);
  }
};

export const createComment = async (postId, newCommentData) => {
  try {
    const { data: newComment } = await axiosReq.post("/comments/", {
      post: postId,
      ...newCommentData,
    });
    return transformCommentData(newComment);
  } catch (error) {
    throw new Error(`Failed to createComment(): ${error}`);
  }
};

export const editComment = async (commentId, editCommentData) => {
  try {
    const { data: editedComment } = await axiosReq.put(
      `/comments/${commentId}/`,
      editCommentData,
    );
    return transformCommentData(editedComment);
  } catch (error) {
    throw new Error(`Failed to editComment(): ${error}`);
  }
};

export const deleteComment = async (commentId) => {
  try {
    return axiosReq.delete(`comments/${commentId}/`);
  } catch (error) {
    throw new Error(`Failed to deleteComment(): ${error}`);
  }
};
