import React from "react";
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
import commentsImg from "../../assets/comments.png";
import { Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ReactionsBar = ({
  id,
  is_owner,
  reaction_id,
  crown_count,
  good_count,
  love_count,
  comments_count,
}) => {
  const currentUser = useAuth();
  const crownSrc = crownDefault;
  const goodSrc = goodDefault;
  const loveSrc = loveDefault;

  return (
    <div>
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
