import React, { useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import styles from "./UserProfile.module.css";
import EditProfile from "../../pages/profiles/EditProfile";
import { ProfileEditDropdown } from "../MoreDropdown";

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
}) => {
  const [editProfile, setEditProfile] = useState(false);

  const handleEdit = async (profileId, editProfileData) => {
    await onProfileEdit(profileId, editProfileData);
    setEditProfile(false);
  };

  return (
    <>
      {editProfile ? (
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
            </Col>
            <Col lg={3} className="text-lg-right">
              {currentUser &&
                !isOwner &&
                (followingId ? (
                  <Button onClick={onUnfollow}>Unfollow</Button>
                ) : (
                  <Button onClick={onFollow}>Follow</Button>
                ))}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default UserProfile;
