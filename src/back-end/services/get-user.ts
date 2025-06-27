import { User } from "../types/user-type";
import { mockUsers } from "../../utils/mock-data";

//Função para consultar informações de um usuário
export function getUser(userId: string): User {
  const userData = mockUsers.find((user) => user.id === userId);

  if (!userData) {
    throw new Error("Usuário não encontrado");
  }

  return userData;
}
