import { mockUsers } from "../../utils/mock-data";

//Função para consultar informações de um usuário
export function getUser(userId: string) {
  return mockUsers.find((user) => user.id === userId);
}
