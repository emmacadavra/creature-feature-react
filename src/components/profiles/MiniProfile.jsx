import React from "react";
import styles from "./MiniProfile.module.css";
import appStyles from "../../App.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { Button } from "react-bootstrap";
import { useProfiles } from "../../contexts/ProfileDataContext";

const MiniProfile = ({ profile, mobile, imageSize = 55 }) => {
  const { id, followingId, image, owner } = profile;
  const { currentUser } = useAuth();
  const isOwner = currentUser?.username === owner;
  const { addFollow, removeFollow } = useProfiles();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link
          to={`/profiles/${id}`}
          className={`${appStyles.PageLink} align-self-center`}
        >
          <Avatar src={image} height={imageSize} />
          <div className={`mx-2 ${styles.WordBreak}`}>
            <strong>{owner}</strong>
          </div>
        </Link>
      </div>
      <div className={`text-end ${!mobile && "ms-auto"}`}>
        {!mobile &&
          currentUser &&
          !isOwner &&
          (followingId ? (
            <Button
              variant="info"
              onClick={() => {
                removeFollow(id);
              }}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              variant="dark"
              onClick={() => {
                addFollow(id);
              }}
            >
              Follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default MiniProfile;
