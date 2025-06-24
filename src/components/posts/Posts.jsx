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

const Posts = ({ hideCreatePost, hideFilters, getPostsParams = null }) => {
  const { currentUser } = useAuth();
  console.log("Current User:", currentUser);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [appendPosts, setAppendPosts] = useState(false);
  const [searchParams] = useSearchParams();

  const searchParamsObj = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts({
        ...searchParamsObj,
        ...(getPostsParams ? getPostsParams : {}),
        page,
        currentlyLoggedInUser: currentUser ? currentUser.pk : null,
      });
      setPostsData(
        appendPosts ? [...postsData, ...data.results] : data.results,
      );
      setHasMorePages(data.hasMorePages);
      setPostsLoading(false);
      setAppendPosts(false);
    };
    setPostsLoading(!appendPosts ? true : false);
    fetchPosts();
  }, [searchParams, page, getPostsParams]);

  const toggleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };

  const handleCreate = async (newPostData) => {
    const { data: newPost, formErrors } = await createPost(
      newPostData,
      currentUser.pk,
    );

    if (formErrors) {
      return formErrors;
    }

    setShowCreatePost(false);
    setPostsData([newPost, ...postsData]);
  };

  const handleEdit = async (postId, editPostData) => {
    const { data: editedPost, formErrors } = await editPost(
      postId,
      editPostData,
    );

    if (formErrors) {
      return formErrors;
    }

    const index = postsData.findIndex((post) => {
      return post.id === postId;
    });
    postsData[index] = editedPost;
    setPostsData([...postsData]);
  };

  const handleDelete = async (postId) => {
    await deletePost(postId);
    setPostsData(postsData.filter((post) => post.id !== postId));
  };

  return (
    <Container className="d-flex flex-column justify-content-center">
      {!hideCreatePost && (
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
      )}
      {!hideFilters && (
        <Row>
          <Col className="d-flex flex-column justify-content-center">
            {currentUser && <PostFilters />}
          </Col>
        </Row>
      )}
      <Row>
        <Col className="d-flex flex-column justify-content-center">
          <Container>
            <Row>
              <Col>
                {postsLoading ? (
                  <Container>
                    <Asset spinner />
                  </Container>
                ) : (
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
