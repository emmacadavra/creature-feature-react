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
  const { data: newFollowData } = await axiosReq.post("/followers/", {
    followed: profileToFollowId,
  });
  return transformFollowData(newFollowData);
};

export const deleteFollow = async (profileToUnfollowId) => {
  await axiosReq.delete(`/followers/${profileToUnfollowId}/`);
};
