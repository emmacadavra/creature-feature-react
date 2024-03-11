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

  useEffect(() => {
    const handleMount = async () => {
      try {
        const data = await getProfiles({ ordering: "-followers_count" });
        setCurrentProfiles(
          data.map((profile) => ({ ...profile, popular: true })),
        );
        setCurrentProfilesLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    handleMount();
  }, []);

  const getProfile = async (profileId) => {
    setCurrentProfileId(profileId);

    // Find the index of the requested profileId if it is already in currentProfiles
    const currentProfileIndex = currentProfiles?.findIndex(
      (currentProfile) => currentProfile.id === profileId,
    );

    // If the requested prodileId is already in currentProfiles we don't need to get it again
    if (currentProfileIndex >= 0) {
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

    const currentProfileIndex = currentProfiles.findIndex(
      (currentProfile) => currentProfile.id === currentProfileId,
    );
    currentProfiles[currentProfileIndex] = editedProfile;
    setCurrentProfiles([...currentProfiles]);
  };

  const addFollow = async (profileId) => {
    const newFollow = await createFollow(profileId);

    const currentProfileIndex = currentProfiles.findIndex(
      (currentProfile) => currentProfile.id === profileId,
    );
    currentProfiles[currentProfileIndex] = {
      ...currentProfiles[currentProfileIndex],
      followingId: newFollow.id,
    };
    setCurrentProfiles([...currentProfiles]);
  };

  const removeFollow = async (profileId) => {
    const currentProfileIndex = currentProfiles.findIndex(
      (currentProfile) => currentProfile.id === profileId,
    );

    await deleteFollow(currentProfiles[currentProfileIndex].followingId);
    currentProfiles[currentProfileIndex] = {
      ...currentProfiles[currentProfileIndex],
      followingId: null,
    };
    setCurrentProfiles([...currentProfiles]);
  };

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
  const { getProfile, ...context } = useContext(ProfilesContext);

  useEffect(() => {
    if (!profileId || context.popularProfileData.length === 0) {
      return;
    }

    getProfile(profileId);
  }, [profileId, context.popularProfileData]);

  return context;
};
