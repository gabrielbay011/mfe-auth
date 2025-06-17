import normalizeEmail, {
  emailAlreadyExists,
} from "../../back-end/validators/sign-up-validations";
import SHA512 from "crypto-js/sha512";

export async function signUpUser(data: any) {
  try {
    const normalizedEmail = normalizeEmail(data.email);
    const hashedPassword = SHA512(data.password).toString();

    const userToSend = {
      name: data.name,
      lastName: data.lastName,
      profit: data.profit,
      email: normalizedEmail,
      password: hashedPassword,
    };

    if (emailAlreadyExists(data.email)) {
      throw new Error("Email já cadastrado");
    }

    // eslint-disable-next-line no-console
    console.log("Usuário cadastrado: ", userToSend);

    return userToSend;
  } catch (err) {
    throw err;
  }
}
