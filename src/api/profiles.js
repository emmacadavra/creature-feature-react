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

export const getProfiles = async (params) => {
  try {
    const { data: allProfilesData } = await axiosReq.get("/profiles/", {
      params: params,
    });

    return allProfilesData.results.map((profile) => {
      return transformProfileData(profile);
    });
  } catch (error) {
    throw new Error(`Failed to getProfiles(): ${error}`);
  }
};

export const getUserProfile = async (profileId) => {
  try {
    const { data: userProfileData } = await axiosReq.get(
      `/profiles/${profileId}/`,
    );
    return transformProfileData(userProfileData);
  } catch (error) {
    throw new Error(`Failed to getUserProfile(): ${error}`);
  }
};

export const editProfile = async (profileId, editProfileData) => {
  if (!(editProfileData instanceof FormData)) {
    throw new Error("editProfileData must be an instance of FormData");
  }
  try {
    const { data: editedPost } = await axiosReq.put(
      `/profiles/${profileId}/`,
      editProfileData,
    );

    return transformProfileData(editedPost);
  } catch (error) {
    throw new Error(`Failed to editProfile(): ${error}`);
  }
};
