import React, { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import styles from "./UserProfile.module.css";
import appStyles from "../../App.module.css";
import EditProfile from "../../pages/profiles/EditProfile";
import { ProfileEditDropdown } from "../MoreDropdown";
import { Link } from "react-router-dom";

const UserProfile = ({
  profileOwner,
  profileId,
  name,
  content,
  image,
  postsCount,
  followersCount,
  followingCount,
  followingId,
  currentUser,
  isOwner,
  onFollow,
  onUnfollow,
  onProfileEdit,
  homepage,
}) => {
  const [editProfile, setEditProfile] = useState(false);

  const handleEdit = async (profileId, editProfileData) => {
    await onProfileEdit(profileId, editProfileData);
    setEditProfile(false);
  };

  return (
    <>
      {homepage ? (
        <Container
          className={`d-none d-lg-block d-flex flex-column align-items-center justify-content-center ${appStyles.Content} ${styles.HomepageContent}`}
        >
          <Row className="justify-content-center">
            <Link
              to={`/profiles/${profileId}`}
              className={`${appStyles.PageLink} text-center`}
            >
              <Image
                className={styles.ProfileImageHomepage}
                roundedCircle
                src={image}
              />
            </Link>
          </Row>
          <Row className="text-center">
            <Link to={`/profiles/${profileId}`} className={appStyles.PageLink}>
              <h4 className="m-2">{name}</h4>
            </Link>
            <Link to={`/profiles/${profileId}`} className={appStyles.PageLink}>
              <h6>{profileOwner}</h6>
            </Link>
          </Row>
          <Row className="text-center">
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <div className="text-center">
                <div>{followersCount}</div>
                <div>followers</div>
              </div>
              <div className="text-center">
                <div>{followingCount}</div>
                <div>following</div>
              </div>
              <div className="text-center">
                <div>{postsCount}</div>
                <div>posts</div>
              </div>
            </Col>
          </Row>
        </Container>
      ) : editProfile ? (
        <EditProfile
          onProfileEdit={handleEdit}
          onEditCancel={() => {
            setEditProfile(false);
          }}
          profileId={profileId}
          defaultName={name}
          defaultContent={content}
          defaultImage={image}
        />
      ) : (
        <>
          <div className="text-end m-2">
            {isOwner && (
              <ProfileEditDropdown
                profileId={profileId}
                onEdit={() => {
                  setEditProfile(true);
                }}
              />
            )}
          </div>
          <Row className="px-3 text-center">
            <Col lg={6} className="text-lg-left">
              <Image
                className={styles.ProfileImage}
                roundedCircle
                src={image}
                fluid
              />
            </Col>
            <Col lg={6}>
              <h3 className="m-2">{name}</h3>
              <h6>{profileOwner}</h6>

              <Row className="justify-content-center no-gutters">
                <Col xs={3} className="my-2">
                  <div>{postsCount}</div>
                  <div>posts</div>
                </Col>
                <Col xs={3} className="my-2">
                  <div>{followersCount}</div>
                  <div>followers</div>
                </Col>
                <Col xs={3} className="my-2">
                  <div>{followingCount}</div>
                  <div>following</div>
                </Col>
              </Row>
              <Row>{content && <Col className="p-3">{content}</Col>}</Row>
              <div className="text-center">
                {currentUser &&
                  !isOwner &&
                  (followingId ? (
                    <Button variant="dark" onClick={onUnfollow}>
                      Unfollow
                    </Button>
                  ) : (
                    <Button variant="info" onClick={onFollow}>
                      Follow
                    </Button>
                  ))}
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default UserProfile;
