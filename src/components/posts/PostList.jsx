import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Col, Container, Row } from "react-bootstrap";
import noResults from "../../assets/no_results.png";
import Asset from "../Asset";
import { getPosts } from "../../api/posts";
import InfiniteScroll from "react-infinite-scroll-component";
// import { fetchMoreData } from "../../utils/utils";

const PostList = ({ message, filter = "", query }) => {
  const [postsData, setPostsData] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(filter, query, page);
        setPostsData(data.results);
        setHasMorePages(data.hasMorePages);
        setPostsLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    setPostsLoaded(false);
    fetchPosts();
  }, [filter, query, page]);

  return (
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
                        updatedOn={post.updatedOn}
                        key={post.id}
                        setPostsData={setPostsData}
                      />
                    );
                  })}
                </InfiniteScroll>
              ) : (
                <Container>
                  <Asset src={noResults} message={message} />
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
  );
};

export default PostList;
