import { mockUsers } from "../../utils/mock-data";

//Função para remover os pontos do e-mail
export default function normalizeEmail(email: string) {
  let result = email.toLocaleLowerCase();
  const [user, domain] = result.split("@");
  const userWithoutDots = user.replace(/\./g, "");
  return `${userWithoutDots}@${domain}`;
}

//Função para verificar se o e-mail já existe
export function emailAlreadyExists(email: string): boolean {
  const normalizedEmail = normalizeEmail(email);
  return mockUsers.some((user) => user.email === normalizedEmail);
}
