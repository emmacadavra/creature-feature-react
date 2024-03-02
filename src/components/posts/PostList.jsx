import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Col, Container, Row } from "react-bootstrap";
import noResults from "../../assets/no_results.png";
import Asset from "../Asset";
import { getPosts } from "../../api/posts";
import InfiniteScroll from "react-infinite-scroll-component";

const PostList = ({ message, filter = "", query }) => {
  const [postsData, setPostsData] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [appendPosts, setAppendPosts] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(filter, query, page);
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
  }, [filter, query, page]);

  // notes on rerendering component when post created/deleted:
  // (example from https://www.youtube.com/watch?v=Nxe-9PkP8Nw)

  // const [authors, setAuthors] = useState([])

  // useEffect (() => {
  //  const fetchData = async () => {
  //    const result = await fetch('httpe://bleblebe')
  //    const jsonResult = await result.json()
  //    setAuthors(jsonResult)
  //  }
  //  fetchData()
  // }, [])

  // const newAuthor = await result.json()
  // setAuthors(oldAuthors=>[...oldAuthors, newAuthor])

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
