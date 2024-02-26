import React, { useRef, useState } from "react";
import styles from "../../styles/ReactionsBar.module.css";
import crownDefault from "../../assets/crown.png";
import crownGreyscale from "../../assets/crown_greyscale.png";
import crownHighlight from "../../assets/crown_highlight.png";
import goodDefault from "../../assets/good.png";
import goodGreyscale from "../../assets/good_greyscale.png";
import goodHighlight from "../../assets/good_highlight.png";
import loveDefault from "../../assets/love.png";
import loveGreyscale from "../../assets/love_greyscale.png";
import loveHighlight from "../../assets/love_highlight.png";
// import commentsImg from "../../assets/comments.png";
import { Image, Overlay } from "react-bootstrap";
import { createReaction } from "../../api/reactions";
// import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const getReactionsSrc = (currentUserReaction) => {
  if (!currentUserReaction) {
    return {
      crownSrc: crownDefault,
      goodSrc: goodDefault,
      loveSrc: loveDefault,
    };
  }

  if (currentUserReaction.reactionType === "CROWN") {
    return {
      crownSrc: crownHighlight,
      goodSrc: goodGreyscale,
      loveSrc: loveGreyscale,
    };
  }

  if (currentUserReaction.reactionType === "GOOD") {
    return {
      crownSrc: crownGreyscale,
      goodSrc: goodHighlight,
      loveSrc: loveGreyscale,
    };
  }

  if (currentUserReaction.reactionType === "LOVE") {
    return {
      crownSrc: crownGreyscale,
      goodSrc: goodGreyscale,
      loveSrc: loveHighlight,
    };
  }
};

const ReactionsBar = ({
  postId,
  isOwner,
  currentUserReaction,
  crownCount,
  goodCount,
  loveCount,
}) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.pk;
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleReaction = (reaction) => {
    if (currentUser && isOwner === false) {
      createReaction(userId, postId, reaction);
    } else {
      setShow(!show);
    }
  };

  const { crownSrc, goodSrc, loveSrc } = getReactionsSrc(currentUserReaction);

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
        {crownCount}
        <Image
          src={goodSrc}
          onClick={() => {
            handleReaction("GOOD");
          }}
          className={styles.Reactions}
        />
        {goodCount}
        <Image
          src={loveSrc}
          onClick={() => {
            handleReaction("LOVE");
          }}
          className={styles.Reactions}
        />
        {loveCount}
      </span>

      {/* 
      <Link to={`posts/${id}`}>
        NEED TO AMEND THIS TO COMMENTS
        <Image src={commentsImg} className={styles.Reactions} />
        {comments_count}
      </Link> */}
    </div>
  );
};

export default ReactionsBar;
