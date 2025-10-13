import React, { useContext, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import {
  editProfile as editProfileData,
  getProfiles,
  getUserProfile,
} from "../api/profiles";
import { createFollow, deleteFollow } from "../api/followers";
import { useAuth } from "./AuthContext";

export const ProfilesContext = createContext({
  currentProfiles: null,
  popularProfileData: null,
  popularProfilesLoading: true,
  currentProfile: null,
  currentProfileLoading: false,
  getProfile: () => {},
});

export const ProfilesProvider = ({ children }) => {
  const [currentProfilesLoading, setCurrentProfilesLoading] = useState(true);
  const [currentProfiles, setCurrentProfiles] = useState([]);
  const [currentProfileId, setCurrentProfileId] = useState(null);
  const [currentProfileLoading, setCurrentProfileLoading] = useState(false);

  const { currentUser } = useAuth();
  const currentUserProfileId = currentUser?.id;

  const currentProfile = getProfileById(currentProfiles, currentProfileId);

  useEffect(() => {
    const handleMount = async () => {
      // vvv TO DO: POPULAR PROFILES REFACTOR vvv
      const data = await getProfiles({ ordering: "-followers_count" });
      const filteredData = data.map((profile) => ({
        ...profile,
        popular: true,
      }));

      setCurrentProfiles(filteredData);
      setCurrentProfilesLoading(false);
    };
    handleMount();
  }, []);

  const getProfile = async (profileId) => {
    const currentProfile = getProfileById(currentProfiles, profileId);

    if (currentProfile) {
      setCurrentProfileId(profileId);
      return;
    }

    setCurrentProfileLoading(true);
    const currentProfileData = await getUserProfile(profileId);
    setCurrentProfileId(profileId);
    setCurrentProfiles([...currentProfiles, currentProfileData]);
    setCurrentProfileLoading(false);
  };

  const editProfile = async (profileId, profileData) => {
    const editedProfile = await editProfileData(profileId, profileData);

    const updatedCurrentProfiles = updateProfileById(
      currentProfiles,
      profileId,
      editedProfile,
    );
    setCurrentProfiles(updatedCurrentProfiles);
  };

  const addFollow = async (profileId) => {
    const newFollow = await createFollow(profileId);
    const targetProfile = getProfileById(currentProfiles, profileId);
    const currentUserProfile = getProfileById(
      currentProfiles,
      currentUserProfileId,
    );

    let updatedCurrentProfiles = updateProfileById(currentProfiles, profileId, {
      followingId: newFollow.id,
      followersCount: targetProfile.followersCount + 1,
    });

    updatedCurrentProfiles = updateProfileById(
      currentProfiles,
      currentUserProfileId,
      {
        followingCount: currentUserProfile.followingCount + 1,
      },
    );

    setCurrentProfiles(updatedCurrentProfiles);
  };

  const removeFollow = async (profileId) => {
    const targetProfile = getProfileById(currentProfiles, profileId);

    const currentUserProfile = getProfileById(
      currentProfiles,
      currentUserProfileId,
    );

    await deleteFollow(targetProfile.followingId);

    let updatedCurrentProfiles = updateProfileById(currentProfiles, profileId, {
      followingId: null,
      followersCount: targetProfile.followersCount - 1,
    });

    updatedCurrentProfiles = updateProfileById(
      currentProfiles,
      currentUserProfileId,
      {
        followingCount: currentUserProfile.followingCount - 1,
      },
    );

    setCurrentProfiles(updatedCurrentProfiles);
  };

  const popularProfiles = useMemo(
    () => currentProfiles.filter((profile) => profile.popular),
    [currentProfiles],
  );

  return (
    <ProfilesContext.Provider
      value={{
        currentProfiles: currentProfiles,
        popularProfileData: popularProfiles,
        currentProfilesLoading,
        currentProfile: currentProfile,
        currentProfileLoading,
        getProfile,
        editProfile,
        addFollow,
        removeFollow,
        isProfileOwner: currentUser?.username === currentProfile?.owner,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
};

const getProfileById = (profiles, id) =>
  profiles.find((profile) => profile.id === id);

const updateProfileById = (profiles, id, data) => {
  const profileIndex = profiles.findIndex((profile) => profile.id === id);

  if (profileIndex >= 0) {
    profiles[profileIndex] = { ...profiles[profileIndex], ...data };
    return [...profiles];
  }

  return profiles;
};

export const useProfiles = (profileId) => {
  const { getProfile, currentProfiles, ...context } =
    useContext(ProfilesContext);

  useEffect(() => {
    if (!profileId || currentProfiles.length === 0) {
      return;
    }

    getProfile(profileId);
  }, [profileId, currentProfiles]);

  return context;
};
