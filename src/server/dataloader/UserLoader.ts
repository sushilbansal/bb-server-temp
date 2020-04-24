import DataLoader from "dataloader";
import { User } from "../entity/User";

type BatchUser = (ids: string[]) => Promise<User[]>;

const batchUsers: BatchUser = async (ids: string[]) => {
  const users = await User.findByIds(ids);
  const userMap: { [key: string]: User } = {};
  users.forEach((user) => (userMap[user.id] = user));
  return ids.map((id) => userMap[id]);
};
export const UserLoader = () => new DataLoader<string, User>(batchUsers as any);
