import { axiosReq } from "./axiosDefaults";
// import { getPosts } from "./posts";

export const createReaction = async (userId, postId, reaction) => {
  await axiosReq.post("/reactions/", {
    owner: userId,
    post: postId,
    reaction: reaction,
  });
};

// export const undoReaction = async () => {
//   await axiosReq.delete(
//     `/reactions/${getPosts.currentUserReaction.reactionId}/`,
//   );
// };

// ^^^ need to set currentUserReaction to null
