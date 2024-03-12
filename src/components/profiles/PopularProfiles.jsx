import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../Asset";
import MiniProfile from "./MiniProfile";
import { useProfiles } from "../../contexts/ProfileDataContext";
import styles from "./PopularProfiles.module.css";
import badge from "../../assets/badge.png";

const PopularProfiles = ({ mobile }) => {
  const { popularProfileData, currentProfilesLoading } = useProfiles();

  return (
    <Container className={`${mobile && "d-lg-none text-center"}`}>
      {currentProfilesLoading ? (
        <Asset spinner />
      ) : (
        <>
          {mobile ? (
            <div className={`${appStyles.Content}`}>
              <div className="d-flex align-items-center justify-content-center">
                <p>Popular profiles</p>
                <img src={badge} />
              </div>
              <div className="d-flex justify-content-around">
                {popularProfileData.slice(0, 4).map((profile) => (
                  <MiniProfile key={profile.id} profile={profile} mobile />
                ))}
              </div>
            </div>
          ) : (
            <div className={`${appStyles.Content} ${styles.LargeScreen}`}>
              <div className="d-flex align-items-center justify-content-center">
                <p className="text-center">Popular profiles</p>
                <img src={badge} />
              </div>
              {popularProfileData.map((profile) => (
                <MiniProfile key={profile.id} profile={profile} />
              ))}
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default PopularProfiles;
