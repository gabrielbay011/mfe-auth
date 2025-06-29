import { mockUsers } from "../../utils/mock-data";
import { User } from "../../utils/types/user-type";
import normalizeEmail from "../../utils/validators/normalize-email";

//Função para verificar se o e-mail já existe
export function emailAlreadyExists(email: string): boolean {
  const normalizedEmail = normalizeEmail(email);
  return mockUsers.some((user: User) => {
    const userEmailNormalized = normalizeEmail(user.email);
    return userEmailNormalized === normalizedEmail;
  });
}
