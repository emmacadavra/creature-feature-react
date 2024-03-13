import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import styles from "./UserProfile.module.css";
import appStyles from "../../App.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useProfiles } from "../../contexts/ProfileDataContext";
import Asset from "../Asset";

const MyProfile = () => {
  const { currentUser } = useAuth();
  const currentUserProfileId = currentUser?.profile_id;
  const { currentProfile, currentProfilesLoading } =
    useProfiles(currentUserProfileId);

  return (
    <Container
      className={`d-none d-xl-block d-flex flex-column align-items-center justify-content-center mt-3 `}
    >
      {currentProfilesLoading ? (
        <Asset spinner />
      ) : !currentProfilesLoading && currentUser && currentProfile ? (
        <div className={appStyles.Content}>
          <Row className="justify-content-center">
            <Link
              to={`/profiles/${currentProfile.id}`}
              className={`${appStyles.PageLink} text-center`}
            >
              <Image
                className={styles.ProfileImageHomepage}
                roundedCircle
                src={currentProfile.image}
                alt="Profile image"
              />
            </Link>
          </Row>
          <Row className="text-center">
            <Link
              to={`/profiles/${currentProfile.id}`}
              className={appStyles.PageLink}
            >
              <h4 className="m-2">{currentProfile.name}</h4>
            </Link>
            <Link
              to={`/profiles/${currentProfile.id}`}
              className={appStyles.PageLink}
            >
              <h6>{currentProfile.profileOwner}</h6>
            </Link>
          </Row>
          <Row className="text-center">
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <div className="text-center">
                <div>{currentProfile.followersCount}</div>
                <div>followers</div>
              </div>
              <div className="text-center">
                <div>{currentProfile.followingCount}</div>
                <div>following</div>
              </div>
              <div className="text-center">
                <div>{currentProfile.postsCount}</div>
                <div>posts</div>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <div className={appStyles.Content}>
          <Row className="justify-content-center">
            <Image
              className={styles.ProfileImageHomepage}
              alt="Default profile image"
              roundedCircle
              src={
                "https://res.cloudinary.com/dw7gzqpa3/image/upload/v1/default_profile_kkmzvb"
              }
            />
          </Row>
          <Row className="text-center px-2 pt-2">
            <Col>
              Please <Link to={`/signin`}>sign in</Link> or{" "}
              <Link to={`/signup`}>sign up</Link> to create your profile
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default MyProfile;
