import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import styles from "./ProfilePage.module.css";
import appStyles from "../../App.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../api/profiles";
import Asset from "../../components/Asset";
import PopularProfiles from "../../components/profiles/PopularProfiles";
import UserProfile from "./UserProfile";
import UserProfilePosts from "./UserProfilePosts";
// import { createFollow } from "../../api/followers";

const ProfilePage = () => {
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [profileData, setProfileData] = useState({});
  const { currentUser } = useAuth();
  const { id: profileId } = useParams();
  const isOwner = currentUser?.username === profileData.owner;

  console.log(isOwner);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfileData = await getUserProfile(profileId);
        const newProfileData = { ...profileData, ...userProfileData };
        setProfileData(newProfileData);
        setProfileLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
    setProfileLoaded(false);
  }, [profileId, setProfileData]);

  // const handleFollow = async (profileToFollowId) => {
  //   try {
  //     const newFollow = await createFollow(profileToFollowId);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={9}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {profileLoaded ? (
            <>
              <UserProfile
                image={profileData?.image}
                owner={profileData?.owner}
                postsCount={profileData?.postsCount}
                followersCount={profileData?.followersCount}
                followingCount={profileData?.followingCount}
                followingId={profileData?.followingId}
                profileContent={profileData?.content}
                currentUser={currentUser}
                isOwner={isOwner}
                onFollow={() => {}}
                onUnfollow={() => {}}
              />
              <UserProfilePosts />
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={3} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
};

// const ProfilePage = () => {

//   useEffect(() => {

{
  /* <Container>
{profileLoaded ? (
  <>
    <Row>
      <Col>
        <UserProfile />
      </Col>
    </Row>
    <Row>
      <UserPosts />
    </Row>
  </>
) : (
  <Asset spinner />
)}
</Container>
); */
}

export default ProfilePage;
