import { SignUpFormType } from "../types/sign-up-form-type";
import normalizeEmail from "../../utils/validators/normalize-email";
import { nhost } from "../../lib/nhost";
import { apolloPublicClient } from "../../lib/apollo-client";
import { UPDATE_USER_PROFILE } from "../../graphql/mutation/update-user-profile";

//Função para realizar o cadastro do usuário
export async function signUpUser(data: SignUpFormType) {
  const normalizedEmail = normalizeEmail(data.email);

  await nhost.auth.signOut();

  const { session, error } = await nhost.auth.signUp({
    email: normalizedEmail,
    password: data.password,
  });

  await nhost.auth.signOut();

  if (error || !session) {
    throw new Error(error.message);
  }

  await apolloPublicClient.mutate({
    mutation: UPDATE_USER_PROFILE,
    variables: {
      id: session.user.id,
      name: data.name,
      last_name: data.lastName,
      amount: data.profit,
    },
  });

  return session;
}
