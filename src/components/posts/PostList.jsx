import Post from "./Post";
import { Col, Container, Row } from "react-bootstrap";
import noResults from "../../assets/no_results.png";
import Asset from "../Asset";
import { getPosts } from "../../api/posts";
import InfiniteScroll from "react-infinite-scroll-component";

const PostList = ({ message, filter = "", query }) => {
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
