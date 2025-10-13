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

export const createReaction = async (postId, reaction) => {
  try {
    const { data: newReaction } = await axiosReq.post(
      "http://localhost:4000/reactions/",
      {
        post: postId,
        reaction: reaction,
      },
    );
    return transformReactionData(newReaction);
  } catch (error) {
    throw new Error(`Failed to createReaction(): ${error}`);
  }
};

export const editReaction = async (postId, reactionId, reactionType) => {
  try {
    const { data: editedReaction } = await axiosReq.patch(
      `http://localhost:4000/reactions/${reactionId}`,
      { post: postId, id: reactionId, reaction: reactionType },
    );
    return transformReactionData(editedReaction);
  } catch (error) {
    throw new Error(`Failed to editReaction(): ${error}`);
  }
};

export const deleteReaction = async (reactionId) => {
  try {
    await axiosReq.delete(`http://localhost:4000/reactions/${reactionId}`);
  } catch (error) {
    throw new Error(`Failed to deleteReaction(): ${error}`);
  }
};
