import React, { useRef, useState } from "react";
import styles from "../../styles/ReactionsBar.module.css";
import crownDefault from "../../assets/crown.png";
// import crownGreyscale from "../../assets/crown_greyscale.png";
// import crownHighlight from "../../assets/crown_highlight.png";
import goodDefault from "../../assets/good.png";
// import goodGreyscale from "../../assets/good_greyscale.png";
// import goodHighlight from "../../assets/good_highlight.png";
import loveDefault from "../../assets/love.png";
// import loveGreyscale from "../../assets/love_greyscale.png";
// import loveHighlight from "../../assets/love_highlight.png";
// import commentsImg from "../../assets/comments.png";
import { Image, Overlay } from "react-bootstrap";
import { createReaction } from "../../api/reactions";
// import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ReactionsBar = ({ postId, isOwner }) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.pk;
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const crownSrc = crownDefault;
  const goodSrc = goodDefault;
  const loveSrc = loveDefault;

  const handleReaction = (reaction) => {
    if (currentUser && isOwner === false) {
      createReaction(userId, postId, reaction);
    } else {
      setShow(!show);
    }
  };

  return (
    <div>
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <div
            {...props}
            style={{
              position: "absolute",
              backgroundColor: "rgba(255, 100, 100, 0.85)",
              padding: "2px 10px",
              color: "white",
              borderRadius: 3,
              ...props.style,
            }}
          >
            {currentUser
              ? "You can't react to your own posts!"
              : "Please log in to react to posts!"}
          </div>
        )}
      </Overlay>
      <span ref={target}>
        <Image
          src={crownSrc}
          onClick={() => {
            handleReaction("CROWN");
          }}
          className={styles.Reactions}
        />
        1
        <Image
          src={goodSrc}
          onClick={() => {
            handleReaction("GOOD");
          }}
          className={styles.Reactions}
        />
        2
        <Image
          src={loveSrc}
          onClick={() => {
            handleReaction("LOVE");
          }}
          className={styles.Reactions}
        />
        3
      </span>

      {/* {is_owner ? (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>You can&apos;t react to your own posts!</Tooltip>}
        >
          <span>
            <Image src={crownDefault} className={styles.Reactions} />
            {crown_count}
            <Image src={goodDefault} className={styles.Reactions} />
            {good_count}
            <Image src={loveDefault} className={styles.Reactions} />
            {love_count}
          </span>
        </OverlayTrigger>
      ) : reaction_id ? (
        <span onClick={() => {}}>
          <Image src={crownHighlight} className={styles.Reactions} />
          {crown_count}
          <Image src={goodHighlight} className={styles.Reactions} />
          {good_count}
          <Image src={loveHighlight} className={styles.Reactions} />
          {love_count}
        </span>
      ) : currentUser ? (
        <span onClick={() => {}}>
          <Image src={crownDefault} className={styles.Reactions} />
          {crown_count}
          <Image src={goodDefault} className={styles.Reactions} />
          {good_count}
          <Image src={loveDefault} className={styles.Reactions} />
          {love_count}
        </span>
      ) : (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>You must be logged in to react to posts!</Tooltip>}
        >
          <Image src={crownGreyscale} className={styles.Reactions} />
          {crown_count}
          <Image src={goodGreyscale} className={styles.Reactions} />
          {good_count}
          <Image src={loveGreyscale} className={styles.Reactions} />
          {love_count}
        </OverlayTrigger>
      )}
      INSERT REACTIONS BAR W/ REACTION COUNTS ETC
      <Link to={`posts/${id}`}>
        NEED TO AMEND THIS TO COMMENTS
        <Image src={commentsImg} className={styles.Reactions} />
        {comments_count}
      </Link> */}
    </div>
  );
};

export default ReactionsBar;
