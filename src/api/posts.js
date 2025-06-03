import axios from "axios";
import { axiosReq } from "./axiosDefaults";

const transformPostData = (post) => {
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
    currentUserReaction: post.current_user_reaction
      ? {
          reactionId: post.current_user_reaction.reaction_id,
          reactionType: post.current_user_reaction.reaction_type,
        }
      : null,
    reactionCount: post.reactions_count,
    commentCount: post.comments_count,
    crownCount: post.crown_count,
    goodCount: post.good_count,
    loveCount: post.love_count,
    createdOn: post.created_on,
    updatedOn: post.updated_on,
  };
};

export const getPosts = async (params) => {
  try {
    const { data } = await axios.get("http://localhost:4000/posts/", {
      params: params,
    });

    return {
      hasMorePages: data.next ? true : false,
      results: data.results.map((post) => {
        return transformPostData(post);
      }),
    };
  } catch (error) {
    throw new Error(`Failed to getPosts(): ${error}`);
  }
};

export const createPost = async (newPostData) => {
  if (!(newPostData instanceof FormData)) {
    throw new Error("newPostData must be an instance of FormData");
  }
  try {
    const { data: newPost } = await axiosReq.post("/posts/", newPostData);
    return {
      data: transformPostData(newPost),
    };
  } catch (error) {
    if (error.response.status === 400) {
      return { formErrors: error.response.data };
    }

    throw new Error(`Failed to createPost(): ${error}`);
  }
};

export const editPost = async (postId, editPostData) => {
  if (!(editPostData instanceof FormData)) {
    throw new Error("editPostData must be an instance of FormData");
  }
  try {
    const { data: editedPost } = await axiosReq.put(
      `/posts/${postId}/`,
      editPostData,
    );
    return {
      data: transformPostData(editedPost),
    };
  } catch (error) {
    if (error.response.status === 400) {
      return { formErrors: error.response.data };
    }

    throw new Error(`Failed to editPost(): ${error}`);
  }
};

export const deletePost = async (postId) => {
  try {
    await axiosReq.delete(`posts/${postId}/`);
  } catch (error) {
    throw new Error(`Failed to deletePost(): ${error}`);
  }
};
