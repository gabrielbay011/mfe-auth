import sha512 from "crypto-js/sha512";
import { mockUsers } from "../../utils/mock-data";
import normalizeEmail from "../../utils/validators/normalize-email";
import { SignInResult } from "../types/sign-in-result-type";

//Função para realizar o login com os dados mockados
export function signInWithMock(email: string, password: string): SignInResult {
  if (!email || !password) {
    throw new Error("Email e senha são obrigatórios");
  }

  const normalizedEmail = normalizeEmail(email);

  const userData = mockUsers.find(
    (u) => u.email.toLowerCase() === normalizedEmail.toLowerCase()
  );

  if (!userData) {
    throw new Error("Email inválido");
  }

  const hashedPassword = sha512(password).toString();

  if (userData.passwordHash !== hashedPassword) {
    throw new Error("Senha incorreta");
  }

  return {
    message: "Login simulado com sucesso",
    user: { email: userData.email },
  };
}
