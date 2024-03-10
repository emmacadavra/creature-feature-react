import React from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import styles from "./UserProfile.module.css";

const UserProfile = (props) => {
  const {
    image,
    owner,
    postsCount,
    followersCount,
    followingCount,
    followingId,
    profileContent,
    currentUser,
    isOwner,
    onFollow,
    onUnfollow,
  } = props;

  return (
    <>
      <Row className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image className={styles.ProfileImage} roundedCircle src={image} />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{owner}</h3>
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
        {profileContent && <Col className="p-3">{profileContent}</Col>}
      </Row>
    </>
  );
};

export default UserProfile;
