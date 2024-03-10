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
export const getProfiles = async () => {
  const { data: allProfilesData } = await axiosReq.get("/profiles/");
  return transformProfileData(allProfilesData);
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

export const getPopularProfiles = async () => {
  const { data: popularProfiles } = await axiosReq.get(
    "/profiles/?ordering=-followers_count",
  );
  return {
    results: popularProfiles.results.map((profile) => {
      return transformProfileData(profile);
    }),
  };
};
