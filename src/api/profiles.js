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
export const getAllProfiles = async () => {
  const { data: allProfilesData } = await axiosReq.get("/profiles/");
  return transformProfileData(allProfilesData);
};

export const getProfile = async (profileId) => {
  const { data: profileData } = await axiosReq.get(`/profiles/${profileId}`);
  return transformProfileData(profileData);
};

export const getPopularProfiles = async () => {
  const { data } = await axiosReq.get("/profiles/?ordering=-followers_count");

  return {
    results: data.results.map((profile) => {
      return transformProfileData(profile);
    }),
  };
};
