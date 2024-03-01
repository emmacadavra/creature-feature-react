import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        // ^ 1. use reduce method to loop through new page of results received from API
        return acc.some((accResult) => accResult.id === cur.id)
          ? // ^ 3. then use some method to loop through the array of posts in the accumulator
            // 4. compare each accumulator item ^ inside array to the current post id from the newly fetched posts array
            acc
          : // ^ 5. id the some method returns true, it found a match and that post is already being displayed, so return the accumulator and don't add post
            [...acc, cur];
        // ^ 6. if the some method does not find a match, we return an array containing a spread accumulator with the new post attached to it
      }, prevResource.results),
      // ^ 2. then append new results to existing posts in postsData array
    }));
  } catch (err) {
    console.log(err);
  }
};
