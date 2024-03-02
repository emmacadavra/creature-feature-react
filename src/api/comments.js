import { axiosReq } from "./axiosDefaults";

export const getComments = async (postId) => {
  const { data: commentsData } = await axiosReq.get(
    `/comments/?post=${postId}`,
  );

  return {
    hasMorePages: commentsData.next ? true : false,
    results: commentsData.results.map((comment) => {
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
      };
    }),
  };
};
