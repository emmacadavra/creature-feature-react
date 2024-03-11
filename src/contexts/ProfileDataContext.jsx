import React, { useContext, useEffect, useState, useCallback } from "react";
import { createContext } from "react";
import {
  editProfile,
  getPopularProfiles,
  getUserProfile,
} from "../api/profiles";
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

  useEffect(() => {
    const handleMount = async () => {
      try {
        const data = await getPopularProfiles();
        setCurrentProfiles(
          data.results.map((profile) => ({ ...profile, popular: true })),
        );
        setCurrentProfilesLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    handleMount();
  }, []);

  const getProfile = useCallback(
    async (profileId) => {
      setCurrentProfileId(profileId);

      const currentProfileIndex = currentProfiles?.findIndex(
        (currentProfile) => currentProfile.id === profileId,
      );

      if (currentProfileLoading || currentProfileIndex >= 0) {
        return;
      }

      setCurrentProfileLoading(true);
      const currentProfileData = await getUserProfile(profileId);

      if (currentProfileIndex >= 0) {
        currentProfiles[currentProfileIndex] = currentProfileData;
        setCurrentProfiles([...currentProfiles]);
      } else {
        setCurrentProfiles([...currentProfiles, currentProfileData]);
      }
      setCurrentProfileLoading(false);
    },
    [currentProfiles, currentProfileLoading],
  );

  const editCurrentProfile = useCallback(async (editProfileData) => {
    const editedProfile = await editProfile(currentProfileId, editProfileData);

    const currentProfileIndex = currentProfiles.findIndex(
      (currentProfile) => currentProfile.id === currentProfileId,
    );
    currentProfiles[currentProfileIndex] = editedProfile;
    setCurrentProfiles([...currentProfiles]);
  });

  const addFollow = useCallback(async (profileId) => {
    const newFollow = await createFollow(profileId);

    const currentProfileIndex = currentProfiles.findIndex(
      (currentProfile) => currentProfile.id === profileId,
    );
    currentProfiles[currentProfileIndex] = {
      ...currentProfiles[currentProfileIndex],
      followingId: newFollow.id,
    };
    setCurrentProfiles([...currentProfiles]);
  });

  const removeFollow = useCallback(async (profileId) => {
    const currentProfileIndex = currentProfiles.findIndex(
      (currentProfile) => currentProfile.id === profileId,
    );

    await deleteFollow(currentProfiles[currentProfileIndex].followingId);
    currentProfiles[currentProfileIndex] = {
      ...currentProfiles[currentProfileIndex],
      followingId: null,
    };
    setCurrentProfiles([...currentProfiles]);
  });

  const currentProfile = currentProfiles.find(
    (profile) => profile.id === currentProfileId,
  );

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

export const useProfiles = (profileId) => {
  const { getProfile, ...otherContextProps } = useContext(ProfilesContext);

  useEffect(() => {
    if (!profileId || otherContextProps.popularProfileData.length === 0) {
      return;
    }

    getProfile(profileId);
  }, [profileId, otherContextProps.popularProfileData]);

  return otherContextProps;
};
