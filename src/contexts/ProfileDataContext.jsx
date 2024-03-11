import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { editProfile, getProfiles, getUserProfile } from "../api/profiles";
import { createFollow, deleteFollow } from "../api/followers";
import { useAuth } from "./AuthContext";

export const ProfilesContext = createContext({
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
  const currentUserProfileId = currentUser?.profile_id;

  const currentProfile = getProfileById(currentProfiles, currentProfileId);
  // const currentProfileIsCurrentUser = Boolean(
  //   currentProfile && currentProfile.owner === currentUser?.username,
  // );

  useEffect(() => {
    const handleMount = async () => {
      const data = await getProfiles({ ordering: "-followers_count" });
      setCurrentProfiles(
        data.map((profile) => ({ ...profile, popular: true })),
      );
      setCurrentProfilesLoading(false);
    };
    handleMount();
  }, []);

  const getProfile = async (profileId) => {
    setCurrentProfileId(profileId);

    // Find the index of the requested profileId if it is already in currentProfiles
    const currentProfile = getProfileById(currentProfiles, profileId);

    // If the requested prodileId is already in currentProfiles we don't need to get it again
    if (currentProfile) {
      return;
    }

    // Get profile from backend and append it to currentProfiles
    setCurrentProfileLoading(true);
    const currentProfileData = await getUserProfile(profileId);
    setCurrentProfiles([...currentProfiles, currentProfileData]);
    setCurrentProfileLoading(false);
  };

  const editCurrentProfile = async (editProfileData) => {
    const editedProfile = await editProfile(currentProfileId, editProfileData);

    const updatedCurrentProfiles = updateProfileById(
      currentProfiles,
      currentProfileId,
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

  return (
    <ProfilesContext.Provider
      value={{
        popularProfileData: currentProfiles.filter(
          (profile) => profile.popular,
        ),
        currentProfilesLoading,
        currentProfile: currentProfile,
        currentProfileLoading,
        getProfile,
        editCurrentProfile,
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
  const { getProfile, ...context } = useContext(ProfilesContext);

  useEffect(() => {
    if (!profileId || context.popularProfileData.length === 0) {
      return;
    }

    getProfile(profileId);
  }, [profileId, context.popularProfileData]);

  return context;
};
