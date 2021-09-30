import { createPost } from "../../resolvers/Post.mutation";
import { getAccessToken, login, signUp} from "../../resolvers/User.mutation";
import { FollowUser, RejectFollowRequest, RemoveFollower, Unfollow } from "../../resolvers/UserFollow.mutation";

const Mutation = {
  // User
  signUp,
  login,
  getAccessToken,

  // Post
  createPost,
  
  // User Follow
  FollowUser,
  Unfollow,
  RemoveFollower,
  RejectFollowRequest
};

export default Mutation;
