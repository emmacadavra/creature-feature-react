import { axiosReq } from "./axiosDefaults";

const transformProfileData = (profile) => {
  return {
    id: profile.id,
    owner: profile.owner,
    isOwner: profile.is_owner,
    name: profile.name,
    content: profile.content,
    image: profile.image,
    followingId: profile.following_id,
    postsCount: profile.posts_count,
    followersCount: profile.followers_count,
    followingCount: profile.following_count,
    createdOn: profile.created_on,
    updatedOn: profile.updated_on,
  };
};

// TODO: figure out if necessary (probably not?)
export const getProfiles = async (params) => {
  const { data: allProfilesData } = await axiosReq.get("/profiles/", {
    params: params,
  });

  return allProfilesData.results.map((profile) => {
    return transformProfileData(profile);
  });
};

export const getUserProfile = async (profileId) => {
  const { data: userProfileData } = await axiosReq.get(
    `/profiles/${profileId}/`,
  );
  return transformProfileData(userProfileData);
};

export const editProfile = async (profileId, editProfileData) => {
  if (!(editProfileData instanceof FormData)) {
    throw new Error("editProfileData must be an instance of FormData");
  }
  const { data: editedPost } = await axiosReq.put(
    `/profiles/${profileId}/`,
    editProfileData,
  );
  return transformProfileData(editedPost);
};
