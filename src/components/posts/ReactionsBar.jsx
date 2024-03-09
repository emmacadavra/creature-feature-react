import React, { useRef, useState } from "react";
import styles from "./ReactionsBar.module.css";
import crownDefault from "../../assets/crown.png";
import crownGreyscale from "../../assets/crown_greyscale.png";
import crownHighlight from "../../assets/crown_highlight.png";
import goodDefault from "../../assets/good.png";
import goodGreyscale from "../../assets/good_greyscale.png";
import goodHighlight from "../../assets/good_highlight.png";
import loveDefault from "../../assets/love.png";
import loveGreyscale from "../../assets/love_greyscale.png";
import loveHighlight from "../../assets/love_highlight.png";
import { Overlay } from "react-bootstrap";
import {
  createReaction,
  deleteReaction,
  editReaction,
} from "../../api/reactions";
import { useAuth } from "../../contexts/AuthContext";

const getReactionsSrc = (postOwner, currentUserReaction) => {
  if (postOwner === true) {
    return {
      crownSrc: crownDefault,
      goodSrc: goodDefault,
      loveSrc: loveDefault,
    };
  }

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
  crownCount: crownCountDefault,
  goodCount: goodCountDefault,
  loveCount: loveCountDefault,
}) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.pk;
  const [show, setShow] = useState(false);
  const [userReaction, setUserReaction] = useState(currentUserReaction);
  const [counts, setCounts] = useState({
    crownCount: crownCountDefault,
    goodCount: goodCountDefault,
    loveCount: loveCountDefault,
  });
  const target = useRef(null);

  const handleReaction = async (reaction) => {
    if (userReaction && userReaction.reactionType === reaction) {
      await deleteReaction(userReaction.reactionId);
      setUserReaction(null);
      const countField = reactionTypeToCountField(reaction);
      setCounts({ ...counts, [countField]: counts[countField] - 1 });
    } else if (userReaction && userReaction.reactionType !== reaction) {
      const editedReaction = await editReaction(
        userId,
        postId,
        userReaction.reactionId,
        reaction,
      );
      setUserReaction({
        reactionId: editedReaction.id,
        reactionType: editedReaction.reactionType,
      });
      const countFieldToDecrement = reactionTypeToCountField(
        userReaction.reactionType,
      );
      const countFieldToIncrement = reactionTypeToCountField(reaction);
      setCounts({
        ...counts,
        [countFieldToDecrement]: counts[countFieldToDecrement] - 1,
        [countFieldToIncrement]: counts[countFieldToIncrement] + 1,
      });
    } else if (currentUser && isOwner === false) {
      const newReaction = await createReaction(userId, postId, reaction);
      setUserReaction({
        reactionId: newReaction.id,
        reactionType: newReaction.reactionType,
      });
      const countField = reactionTypeToCountField(reaction);
      setCounts({ ...counts, [countField]: counts[countField] + 1 });
    } else {
      setShow(!show);
    }
  };

  const postOwner = currentUser && isOwner === true;

  const { crownSrc, goodSrc, loveSrc } = getReactionsSrc(
    postOwner,
    userReaction,
  );

  return (
    <>
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
      <div ref={target} className={styles.ReactionsContainer}>
        <div className={styles.Reaction}>
          <img
            src={crownSrc}
            onClick={() => {
              handleReaction("CROWN");
            }}
            className={styles.ReactionImg}
          />
          {counts.crownCount}
        </div>
        <div className={styles.Reaction}>
          <img
            src={goodSrc}
            onClick={() => {
              handleReaction("GOOD");
            }}
            className={styles.ReactionImg}
          />
          {counts.goodCount}
        </div>
        <div className={styles.Reaction}>
          <img
            src={loveSrc}
            onClick={() => {
              handleReaction("LOVE");
            }}
            className={styles.ReactionImg}
          />
          {counts.loveCount}
        </div>
      </div>
    </>
  );
};

const reactionTypeToCountField = (reactionType) => {
  if (reactionType === "CROWN") {
    return "crownCount";
  }
  if (reactionType === "GOOD") {
    return "goodCount";
  }
  if (reactionType === "LOVE") {
    return "loveCount";
  }
};

export default ReactionsBar;
