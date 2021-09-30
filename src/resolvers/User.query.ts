import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const getUserDetails = (_: any, args: { userId: string }): Promise<User> => {
  try {
    return getRepository(User).findOne({ select: ["id", "firstname", "lastname", "username",], where: { id: args.userId } });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
