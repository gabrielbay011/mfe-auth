import { mockUsers } from "../../utils/mock-data";

//Função para vertificar se o usuário está autenticado
export function userIsAuthenticated(userId: string): boolean {
  const user = mockUsers.find((user) => user.id === userId);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return !!user.isAuthenticated;
}
