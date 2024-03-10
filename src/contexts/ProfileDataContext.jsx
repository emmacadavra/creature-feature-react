import React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { axiosReq } from "../api/axiosDefaults";

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

const getPopularProfiles = async () => {
  const { data } = await axiosReq.get("/profiles/?ordering=-followers_count");
  console.log(data);
  return {
    results: data.results.map((profile) => {
      return transformProfileData(profile);
    }),
  };
};

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const data = await getPopularProfiles();
        setProfileData({
          ...profileData,
          popularProfiles: data,
        });
      } catch (err) {
        console.error(err);
      }
    };
    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={{ setProfileData }}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
