import { mockUsers } from "../../utils/mock-data";

export function getUser(userId: string) {
  return mockUsers.find((user) => user.id === userId);
}
