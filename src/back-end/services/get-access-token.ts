import { mockUsers } from "../../utils/mock-data";

//Função para conseguir token de acesso do usuário
export function getAccessToken(userId: string): string {
  const user = mockUsers.find((user) => user.id === userId);
  return user?.accessToken;
}
