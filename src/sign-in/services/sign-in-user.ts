import normalizeEmail from "../../utils/validators/normalize-email";
import { nhost } from "../../lib/nhost";

//Função para realizar o login com os dados mockados
export async function signInUser(email: string, password: string) {
  if (!email || !password) {
    throw new Error("Email e senha são obrigatórios");
  }

  const normalizedEmail = normalizeEmail(email);

  await nhost.auth.signOut();

  const { session, error } = await nhost.auth.signIn({
    email: normalizedEmail,
    password: password,
  });

  if (error || !session) {
    throw new Error(error.message);
  }

  return session;
}
