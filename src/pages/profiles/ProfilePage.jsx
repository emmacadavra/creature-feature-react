import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import styles from "./ProfilePage.module.css";
import appStyles from "../../App.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../api/profiles";
import Asset from "../../components/Asset";
import PopularProfiles from "../../components/profiles/PopularProfiles";

// import UserProfile from "./UserProfile";
// import UserPosts from "./UserPosts";

const ProfilePage = () => {
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
  });
  const { currentUser } = useAuth();
  const { id } = useParams();

  console.log("currentUser:", currentUser);
  console.log(id);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getUserProfile(id);
        setProfileData({ ...profileData, pageProfile: data });
        setProfileLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
    setProfileLoaded(false);
  }, [id, setProfileData]);

  const userProfile = (
    <>
      <Row className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profileData?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">Profile username</h3>
          <p>Profile stats</p>
        </Col>
        <Col lg={3} className="text-lg-right">
          <p>Follow button</p>
        </Col>
        <Col className="p-3">Profile content</Col>
      </Row>
    </>
  );

  const userProfilePosts = (
    <>
      <hr />
      <p className="text-center">Profile owner posts</p>
      <hr />
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {profileLoaded ? (
            <>
              {userProfile}
              {userProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
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
