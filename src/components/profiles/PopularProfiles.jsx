import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import { getPopularProfiles } from "../../api/profiles";
import { useAuth } from "../../contexts/AuthContext";
import Asset from "../Asset";
import MiniProfile from "./MiniProfile";
// import styles from "./PopularProfiles.module.css";

const PopularProfiles = ({ mobile }) => {
  const [profileData, setProfileData] = useState({
    popularProfiles: { results: [] },
  });
  const [profilesLoaded, setProfilesLoaded] = useState(false);
  const { currentUser } = useAuth();
  const { popularProfiles } = profileData;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const data = await getPopularProfiles(currentUser);
        setProfileData({
          ...profileData,
          popularProfiles: data,
        });
        setProfilesLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    setProfilesLoaded(false);
    handleMount();
  }, [currentUser]);

  return (
    <Container
      className={`${mobile && "d-lg-none text-center"} ${appStyles.Content}`}
    >
      {profilesLoaded ? (
        <>
          <p>Popular profiles:</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <MiniProfile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results.map((profile) => (
              <MiniProfile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
