import { getCustomRepository, getRepository } from "typeorm";
import { Post } from "../entity/Posts";
import { PostRepository } from "../Repositories/PostRepository";

export const getFeedPosts = async (_: any, args: { page: number }, ctx: { userId: string }): Promise<Post[]> => {
  try {
    return getCustomRepository(PostRepository).getFeedPosts(ctx.userId, args.page);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export const getUserPostApi = async (_: any, args: { page: number; userId: string }, ctx: { userId: string }): Promise<Post[]> => {
  try {
    return getRepository(Post).find({
      relations: ["User", "Group"],
      where: { userId: args.userId },
      order: { createdDate: "DESC" },
      skip: (args.page - 1) * 3,
      take: 3
    });
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

