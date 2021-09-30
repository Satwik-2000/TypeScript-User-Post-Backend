import { getUserPosts } from "../../resolvers/Post.mutation";
import { getFeedPosts, getUserPostApi } from "../../resolvers/Post.query";
import { getUserDetails } from "../../resolvers/User.query";
import { getUserRelationCounts, isFollow } from "../../resolvers/UserFollow.query";

const Query = {
  InitQuery: () => {
    return "Test Passed";
  },
  // User
  getUserDetails,

  // Post
  getUserPosts,
  getFeedPosts,
  getUserPostApi,

  // User Follow
  getUserRelationCounts,
  isFollow,
  
};

export default Query;
