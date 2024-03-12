import React from "react";
import Posts from "../components/posts/Posts";
import { Col, Container, Row } from "react-bootstrap";
import PopularProfiles from "../components/profiles/PopularProfiles";
import UserProfile from "../components/profiles/UserProfile";
import { useAuth } from "../contexts/AuthContext";
import { useProfiles } from "../contexts/ProfileDataContext";

const Homepage = () => {
  const { currentUser } = useAuth();
  const currentUserProfileId = currentUser?.profile_id;
  const { currentProfile } = useProfiles(currentUserProfileId);

  return (
    <Container>
      <Row>
        <Col lg={0} xl={3}>
          <PopularProfiles mobile />
          {currentUser && (
            <UserProfile
              profileOwner={currentProfile?.owner}
              profileId={currentProfile?.id}
              name={currentProfile?.name}
              content={currentProfile?.content}
              image={currentProfile?.image}
              postsCount={currentProfile?.postsCount}
              followersCount={currentProfile?.followersCount}
              followingCount={currentProfile?.followingCount}
              homepage
            />
          )}
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={8} xl={6}>
          <Posts />
        </Col>
        <Col lg={4} xl={3}>
          <PopularProfiles />
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
