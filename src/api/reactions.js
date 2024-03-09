import { axiosReq } from "./axiosDefaults";

const transformReactionData = (reaction) => {
  return {
    id: reaction.id,
    owner: reaction.owner,
    post: reaction.post,
    reactionType: reaction.reaction,
    createdOn: reaction.created_on,
  };
};

export const createReaction = async (userId, postId, reaction) => {
  const { data: newReaction } = await axiosReq.post("/reactions/", {
    owner: userId,
    post: postId,
    reaction: reaction,
  });
  return transformReactionData(newReaction);
};

export const editReaction = async (
  userId,
  postId,
  reactionId,
  reactionType,
) => {
  const { data: editedReaction } = await axiosReq.put(
    `/reactions/${reactionId}`,
    { owner: userId, post: postId, id: reactionId, reaction: reactionType },
  );
  return transformReactionData(editedReaction);
};

export const deleteReaction = async (reactionId) => {
  await axiosReq.delete(`/reactions/${reactionId}`);
};
