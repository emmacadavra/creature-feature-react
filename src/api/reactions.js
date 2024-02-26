import { axiosReq } from "./axiosDefaults";

export const createReaction = async (userId, postId, reaction) => {
  await axiosReq.post("/reactions/", {
    owner: userId,
    post: postId,
    reaction: reaction,
  });
};
