import { mockUsers } from "../../utils/mock-data";

export function getAccessToken(userId: string): string {
  const user = mockUsers.find((user) => user.id === userId);
  return user?.accessToken;
}
