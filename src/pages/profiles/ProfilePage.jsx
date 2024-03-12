import React, { useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import styles from "./ProfilePage.module.css";
import appStyles from "../../App.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import Asset from "../../components/Asset";
import PopularProfiles from "../../components/profiles/PopularProfiles";
import UserProfile from "../../components/profiles/UserProfile";
import Posts from "../../components/posts/Posts";
import { useProfiles } from "../../contexts/ProfileDataContext";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const profileId = Number(id);
  const { currentProfile, addFollow, removeFollow, isProfileOwner } =
    useProfiles(profileId);

  const getPostParams = useMemo(
    () => ({ owner__profile: profileId }),
    [profileId],
  );

  return (
    <Container>
      <Row className="justify-content-around">
        <Col className="d-lg-none py-2 p-0">
          <PopularProfiles mobile />
        </Col>
        <Col lg={8} xl={7} className="py-2 px-2 p-0 p-lg-2">
          {currentProfile ? (
            <div className={appStyles.Content}>
              <UserProfile
                profileOwner={currentProfile?.owner}
                profileId={currentProfile.id}
                name={currentProfile?.name}
                content={currentProfile?.content}
                image={currentProfile?.image}
                postsCount={currentProfile?.postsCount}
                followersCount={currentProfile?.followersCount}
                followingCount={currentProfile?.followingCount}
                followingId={currentProfile?.followingId}
                currentUser={currentUser}
                isOwner={isProfileOwner}
                onFollow={() => {
                  addFollow(profileId);
                }}
                onUnfollow={() => {
                  removeFollow(profileId);
                }}
                onProfileEdit={() => {}}
              />
              <Container>
                <Posts
                  getPostsParams={getPostParams}
                  hideFilters={true}
                  hideCreatePost={!isProfileOwner}
                />
              </Container>
            </div>
          ) : (
            <Asset spinner />
          )}
        </Col>
        <Col lg={4} xl={3}>
          <PopularProfiles />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
