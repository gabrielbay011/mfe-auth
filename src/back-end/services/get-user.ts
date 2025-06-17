import { mockUsers } from "../../utils/mock-users";

export function getUser(userId: string) {
  return mockUsers.find((user) => user.id === userId);
}
