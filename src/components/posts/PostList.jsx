import React, { useEffect, useState } from "react";
import Post from "./Post";
import { axiosReq } from "../../api/axiosDefaults";

const PostList = () => {
  const [postsData, setPostsData] = useState();

  useEffect(() => {
    const handleMount = async () => {
      const { data } = await axiosReq.get("/posts");
      setPostsData(data.results);
    };
    handleMount();
  }, []);

  if (!postsData) {
    return <>Loading...</>;
  }

  return (
    <div>
      {postsData.map((post) => {
        return <Post {...post} key={post.id} setPostsData={setPostsData} />;
      })}
    </div>
  );
};

export default PostList;
