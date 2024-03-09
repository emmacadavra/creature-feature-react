import React from "react";
import styles from "./MiniProfile.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { Button } from "react-bootstrap";

const MiniProfile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, followingId, image, owner } = profile;
  const { currentUser } = useAuth();
  const isOwner = currentUser?.username === owner;

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link to={`/profiles/${id}`} className="align-self-center">
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-end ${!mobile && "ms-auto"}`}>
        {!mobile &&
          currentUser &&
          !isOwner &&
          (followingId ? (
            <Button variant="info" onClick={() => {}}>
              Unfollow
            </Button>
          ) : (
            <Button variant="dark" onClick={() => {}}>
              Follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default MiniProfile;
