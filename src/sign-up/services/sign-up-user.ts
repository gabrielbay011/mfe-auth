import { emailAlreadyExists } from "../validators/email-already-exists";
import SHA512 from "crypto-js/sha512";
import { SignUpFormType } from "../types/sign-up-form-type";
import { UserToSend } from "../types/user-to-send";
import normalizeEmail from "../../utils/validators/normalize-email";

//Função para realizar o cadastro do usuário
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
