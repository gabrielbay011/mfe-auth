import { mockUsers } from "../../utils/mock-users";

export function getAccessToken(userId: string): string {
  const user = mockUsers.find((user) => user.id === userId);
  return user?.accessToken;
}
