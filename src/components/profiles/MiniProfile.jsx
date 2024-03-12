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
            <strong>
              <small>{owner}</small>
            </strong>
          </div>
        </Link>
      </div>
      <div className={`text-end ${!mobile && "ms-auto"}`}>
        {!mobile &&
          currentUser &&
          !isOwner &&
          (followingId ? (
            <Button
              variant="dark"
              onClick={() => {
                removeFollow(id);
              }}
              className="px-1"
            >
              <small>Unfollow</small>
            </Button>
          ) : (
            <Button
              variant="info"
              onClick={() => {
                addFollow(id);
              }}
            >
              <small>Follow</small>
            </Button>
          ))}
      </div>
    </div>
  );
};

export default MiniProfile;
