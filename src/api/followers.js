import { axiosReq } from "./axiosDefaults";

const transformFollowData = (followData) => {
  return {
    id: followData.id,
    owner: followData.owner,
    createdOn: followData.created_on,
    followed: followData.followed,
    followedName: followData.followed_name,
  };
};

export const createFollow = async (profileToFollowId) => {
  try {
    const { data: newFollowData } = await axiosReq.post("/followers/", {
      followed: profileToFollowId,
    });
    return transformFollowData(newFollowData);
  } catch (error) {
    throw new Error(`Failed to createFollow(): ${error}`);
  }
};

export const deleteFollow = async (profileToUnfollowId) => {
  try {
    await axiosReq.delete(`/followers/${profileToUnfollowId}/`);
  } catch (error) {
    throw new Error(`Failed to deleteFollow(): ${error}`);
  }
};
