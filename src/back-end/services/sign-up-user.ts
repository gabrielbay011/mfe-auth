import normalizeEmail, {
  emailAlreadyExists,
} from "../../back-end/validators/sign-up-validations";
import SHA512 from "crypto-js/sha512";
import { SignUpFormType } from "../types/sign-up-form-type";
import { UserToSend } from "../types/user-to-send";

//Função para realizar o cadastr o usuário
export function signUpUser(data: SignUpFormType): UserToSend {
  const normalizedEmail = normalizeEmail(data.email);
  const hashedPassword = SHA512(data.password).toString();

  if (emailAlreadyExists(normalizedEmail)) {
    throw new Error("Email já cadastrado");
  }

  //Encapsula as informações do usuário
  const userToSend: UserToSend = {
    name: data.name,
    lastName: data.lastName,
    profit: data.profit,
    email: normalizedEmail,
    password: hashedPassword,
  };

  alert("Cadastro realizado com sucesso");

  return userToSend;
}
