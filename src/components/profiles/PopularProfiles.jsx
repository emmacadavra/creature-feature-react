import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../Asset";
import MiniProfile from "./MiniProfile";
import { useProfiles } from "../../contexts/ProfileDataContext";
// import styles from "./PopularProfiles.module.css";

const PopularProfiles = ({ mobile }) => {
  const { popularProfileData, currentProfilesLoading } = useProfiles();

  return (
    <Container
      className={`${mobile && "d-lg-none text-center"} ${appStyles.Content}`}
    >
      {currentProfilesLoading ? (
        <Asset spinner />
      ) : (
        <>
          <p>Popular profiles:</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfileData.slice(0, 4).map((profile) => (
                <MiniProfile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfileData.map((profile) => (
              <MiniProfile key={profile.id} profile={profile} />
            ))
          )}
        </>
      )}
    </Container>
  );
};

export default PopularProfiles;
