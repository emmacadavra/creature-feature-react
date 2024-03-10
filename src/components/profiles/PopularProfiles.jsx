import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../Asset";
import MiniProfile from "./MiniProfile";
import { useProfileData } from "../../contexts/ProfileDataContext";
// import styles from "./PopularProfiles.module.css";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();
  console.log(popularProfiles);

  return (
    <Container
      className={`${mobile && "d-lg-none text-center"} ${appStyles.Content}`}
    >
      {popularProfiles.results.length ? (
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
