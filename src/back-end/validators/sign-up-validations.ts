import { mockUsers } from "../../utils/mock-data";
import { User } from "../types/user-type";

//Função para remover os pontos do e-mail
export default function normalizeEmail(email: string): string {
  let result = email.toLocaleLowerCase();
  const [user, domain] = result.split("@");

  if (!user || !domain) {
    throw new Error("Formato de e-mail inválido");
  }

  const userWithoutDots = user.replace(/\./g, "");
  return `${userWithoutDots}@${domain}`;
}

//Função para verificar se o e-mail já existe
export function emailAlreadyExists(email: string): boolean {
  const normalizedEmail = normalizeEmail(email);
  return mockUsers.some((user: User) => {
    const userEmailNormalized = normalizeEmail(user.email);
    return userEmailNormalized === normalizedEmail;
  });
}
