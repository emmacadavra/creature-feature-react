import React from "react";
import { useAuth } from "../contexts/AuthContext";

const myCommentData = [
  {
    id: 123,
    message: "Test comment 1",
    userID: 2,
  },
  {
    id: 234,
    message: "Another test comment",
    userID: 1,
  },
];

const Comments = () => {
  const auth = useAuth();

  return (
    <div>
      {myCommentData.map((comment) => (
        <>
          <h2>{comment.message}</h2>
          {comment.userID !== auth.currentUser?.profile_id && (
            <a href="#">Like me!</a>
          )}
        </>
      ))}
    </div>
  );
};

export default Comments;
