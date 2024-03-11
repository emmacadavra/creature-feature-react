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
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={9}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {currentProfile ? (
            <>
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
              <Posts
                getPostsParams={getPostParams}
                hideFilters={true}
                hideCreatePost={false}
              />
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

export default ProfilePage;
