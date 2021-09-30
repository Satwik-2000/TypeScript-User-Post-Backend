import { getCustomRepository } from "typeorm";
import { Post } from "../entity/Posts";
import { PostRepository } from "../Repositories/PostRepository";
import { PostInput } from "../types/post.type";

export const createPost = async (_: any, args: { data: PostInput }, ctx: { userId: string }): Promise<Post> => {
  try {
    const newPost = await getCustomRepository(PostRepository).createPost(args.data, ctx.userId);
    return newPost;
  } catch (err) {
    console.error(err);
    throw new Error("Unable to create post!");
  }
};

export const getUserPosts = async (_: any, args: { userId: string; grpId: string }, ctx: { userId: string }) => {
  try {
    return getCustomRepository(PostRepository).getUserPosts(args.userId);
  } catch (err) {
    console.error(err);
    throw new Error("Internal Server Error!!");
  }
};