import { axiosReq } from "./axiosDefaults";

const transformFollowData = (followData) => {
  return {
    id: followData.id,
    owner: followData.owner_name,
    followed: followData.followed_id,
    followedName: followData.followed_name,
    createdOn: followData.created_on,
  };
};

export const createFollow = async (profileToFollowId, ownerId) => {
  try {
    const { data: newFollowData } = await axiosReq.post(
      "http://localhost:4000/followers",
      {
        owner: ownerId,
        followed: profileToFollowId,
      },
    );
    return transformFollowData(newFollowData);
  } catch (error) {
    throw new Error(`Failed to createFollow(): ${error}`);
  }
};

export const deleteFollow = async (profileToUnfollowId) => {
  try {
    await axiosReq.delete(
      `http://localhost:4000/followers/${profileToUnfollowId}/`,
    );
  } catch (error) {
    throw new Error(`Failed to deleteFollow(): ${error}`);
  }
};
