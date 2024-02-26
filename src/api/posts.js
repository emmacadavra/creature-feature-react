import { axiosReq } from "./axiosDefaults";

export const getPosts = async (filter = "", query = "") => {
  const { data } = await axiosReq.get(
    `/posts/?filter=${filter}&search=${query}`,
  );
  return data.results.map((post) => {
    return {
      id: post.id,
      owner: post.owner,
      isOwner: post.is_owner,
      profileId: post.profile_id,
      profileImage: post.profile_image,
      title: post.title,
      content: post.content,
      image: post.image,
      category: post.category,
      reactionId: post.reaction_id,
      reactionCount: post.reactions_count,
      commentCount: post.comments_count,
      crownCount: post.crown_count,
      goodCount: post.good_count,
      loveCount: post.love_count,
      createdOn: post.created_on,
      updatedOn: post.updated_on,
    };
  });
};
