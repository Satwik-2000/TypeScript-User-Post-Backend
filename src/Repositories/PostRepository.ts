import _ from "lodash";
import { EntityRepository, getRepository, In, IsNull, Repository } from "typeorm";
import { Post } from "../entity/Posts";
import UserFollow from "../entity/UserFollow";
import { PostInput } from "../types/post.type";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  createPost = async (data: PostInput, userId: string) => {
    try {
      const { text, parentId } = data;
      const post = new Post();
      post.userId = userId;
      post.text = text;
      post.parentId = parentId;
      const savedpost = await this.save(post);
      console.log(savedpost);
      console.info("Post Saved");
      return savedpost;
    } catch (err) {
      console.error(err);
      throw new Error("Server error");
    }
  };

  getUserPosts = async (userId: string): Promise<Post[]> => {
    try {
      return getRepository(Post).find({
        relations: ["User"],
        where: {
          userId,
          parentId: IsNull(),
        },
        order: { createdDate: "DESC" }
      });
    } catch (err) {
      console.error(err);
      throw new Error("Internal Server Error!");
    }
  };

  getFeedPosts = async (userId: string, page: number): Promise<Post[]> => {
    try {
      const followings = await getRepository(UserFollow).find({ followerId: userId });
      const userIds = [...followings.map(fol => fol.followingId), userId];
      const conditions = [{ userId: In(userIds) }];
      return this.find({
        relations: ["User"],
        where: conditions,
        order: { createdDate: "DESC" },
        skip: (page - 1) * 3,
        take: 3
      });
    } catch (err) {
      console.error(err);
      throw new Error("Server Error");
    }
  };
}
