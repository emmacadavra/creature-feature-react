import React, { useEffect, useState } from "react";
import { PostFilters } from "./PostFilters";
import { Button, Col, Container, Row } from "react-bootstrap";
import CreateEditPost from "./CreateEditPost";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Posts.module.css";
import appStyles from "../../App.module.css";
import newPost from "../../assets/new_post.png";
import noResults from "../../assets/no_results.png";
import Asset from "../Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { deletePost, editPost, getPosts } from "../../api/posts";
import Post from "./Post";
import { createPost } from "../../api/posts.js";
import { useSearchParams } from "react-router-dom";

const Posts = () => {
  const { currentUser } = useAuth();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [appendPosts, setAppendPosts] = useState(false);
  const [searchParams] = useSearchParams();

  const searchParamsObj = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts({ ...searchParamsObj, page });
        setPostsData(
          appendPosts ? [...postsData, ...data.results] : data.results,
        );
        setHasMorePages(data.hasMorePages);
        setPostsLoaded(true);
        setAppendPosts(false);
      } catch (err) {
        console.error(err);
      }
    };
    setPostsLoaded(!appendPosts ? false : true);
    fetchPosts();
  }, [searchParams, page]);

  const toggleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };

  const handleCreate = async (newPostData) => {
    try {
      const newPost = await createPost(newPostData);
      setShowCreatePost(false);
      setPostsData([newPost, ...postsData]);
    } catch (err) {
      console.error(err);
      // if (err.response?.status !== 401) {
      //   setErrors(err.response?.data);
      // }
      // TODO: REMINDER!!!!
    }
  };

  const handleEdit = async (postId, editPostData) => {
    try {
      const editedPost = await editPost(postId, editPostData);
      const index = postsData.findIndex((post) => {
        return post.id === postId;
      });
      postsData[index] = editedPost;
      setPostsData([...postsData]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      setPostsData(postsData.filter((post) => post.id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center">
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          {currentUser && (
            <Button
              onClick={toggleShowCreatePost}
              className={`${appStyles.IconLink} ${styles.CreateButton}`}
            >
              <img
                src={newPost}
                alt="Create new post"
                height="38"
                className={appStyles.Icon}
              />
              Create Post
            </Button>
          )}
          {showCreatePost && (
            <CreateEditPost
              onPostCreate={handleCreate}
              onPostCancel={toggleShowCreatePost}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          {currentUser && <PostFilters />}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          <Container>
            <Row>
              <Col>
                {postsLoaded ? (
                  <>
                    {postsData.length ? (
                      <InfiniteScroll
                        dataLength={postsData.length}
                        loader={<Asset spinner />}
                        hasMore={hasMorePages}
                        next={() => {
                          setPage(page + 1);
                          setAppendPosts(true);
                        }}
                      >
                        {postsData.map((post) => {
                          return (
                            <Post
                              id={post.id}
                              owner={post.owner}
                              profileId={post.profileId}
                              profileImage={post.profileImage}
                              title={post.title}
                              content={post.content}
                              image={post.image}
                              category={post.category}
                              currentUserReaction={post.currentUserReaction}
                              crownCount={post.crownCount}
                              goodCount={post.goodCount}
                              loveCount={post.loveCount}
                              commentCount={post.commentCount}
                              updatedOn={post.updatedOn}
                              key={post.id}
                              setPostsData={setPostsData}
                              onPostEdit={handleEdit}
                              onPostDelete={handleDelete}
                            />
                          );
                        })}
                      </InfiniteScroll>
                    ) : (
                      <Container>
                        <Asset
                          src={noResults}
                          message={
                            "No results found. Try adjusting the search keywords!"
                          }
                        />
                      </Container>
                    )}
                  </>
                ) : (
                  <Container>
                    <Asset spinner />
                  </Container>
                )}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Posts;
