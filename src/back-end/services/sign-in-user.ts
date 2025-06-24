import sha512 from "crypto-js/sha512";
import { mockUsers } from "../../utils/mock-data";
import normalizeEmail from "../validators/sign-up-validations";

//Função para realizar o login com os dados mockados
export async function signInWithMock(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  const user = mockUsers.find(
    (u) => u.email.toLowerCase() === normalizedEmail.toLowerCase()
  );

  if (!user) {
    throw new Error("Email inválido");
  }

  const hashedPassword = sha512(password).toString();

  if (user.passwordHash !== hashedPassword) {
    throw new Error("Senha incorreta");
  }

  return {
    message: "Login simulado com sucesso",
    user: { email: user.email },
  };
}
