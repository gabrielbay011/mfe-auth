import { mockUsers } from "../../utils/mock-data";

//Função para conseguir token de acesso do usuário
export function getAccessToken(userId: string): string {
  const userData = mockUsers.find((user) => user.id === userId);

  if (!userData) {
    throw new Error("Usuário não encontrado");
  }

  return userData.accessToken;
}
