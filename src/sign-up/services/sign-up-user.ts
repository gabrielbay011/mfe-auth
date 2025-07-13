import { SignUpFormType } from "../types/sign-up-form-type";
import normalizeEmail from "../../utils/validators/normalize-email";
import { nhost } from "../../lib/nhost";
import { apolloPublicClient } from "../../lib/apollo-client";
import { INSERT_USER_PROFILE } from "../../graphql/mutation/insert-user-profile";

//Função para realizar o cadastro do usuário
export async function signUpUser(data: SignUpFormType) {
  const normalizedEmail = normalizeEmail(data.email);

  // if (emailAlreadyExists(normalizedEmail)) {
  //   throw new Error("Email já cadastrado");
  // }

  await nhost.auth.signOut();

  const { session, error } = await nhost.auth.signUp({
    email: normalizedEmail,
    password: data.password,
  });

  if (error || !session) {
    throw error ?? new Error("Erro ao cadastrar usuário");
  }

  //Busca o usuário autenticado após o signUp
  const user = await nhost.auth.getUser();

  if (!user) {
    throw new Error("Usuário não encontrado após cadastro");
  }

  await apolloPublicClient.mutate({
    mutation: INSERT_USER_PROFILE,
    variables: {
      id: user.id,
      name: data.name,
      last_name: data.lastName,
    },
  });

  return session;
}
