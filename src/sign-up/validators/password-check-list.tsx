import check from "../../public/images/icon-check.svg";
import uncheck from "../../public/images/icon-uncheck.svg";
import { signUpFormSchema } from "../schemas/sign-up-form-schema";
import { PasswordChecklistProps } from "../types/password-check-list-prosp";

export default function PasswordChecklist({
  password,
  confirmPassword,
}: PasswordChecklistProps) {
  const passwordSchema = signUpFormSchema.innerType().shape.password;
  const result = passwordSchema.safeParse(password);

  const errorMessages = result.success
    ? []
    : result.error.issues.map((issue) => issue.message);

  const hasError = (msg: string) => errorMessages.includes(msg);

  const passwordsMatch =
    confirmPassword === "" ? false : password === confirmPassword;

  return (
    <div className="mt-2 ml-5 md:ml-0 p-1">
      <p className="font-bold text-[14px]">
        A nova senha deve conter pelo menos:
      </p>
      <ul className="text-[14px]">
        <li className="flex">
          <img
            src={
              !hasError("A senha deve ter pelo menos 12 caracteres")
                ? check
                : uncheck
            }
            alt=""
          />
          12 caracteres
        </li>
        <li className="flex">
          <img
            src={
              !hasError("A senha deve ter pelo menos uma letra maiúscula")
                ? check
                : uncheck
            }
            alt=""
          />
          Uma letra maiúscula
        </li>
        <li className="flex">
          <img
            src={
              !hasError("A senha deve ter pelo menos uma letra minúscula")
                ? check
                : uncheck
            }
            alt=""
          />
          Uma letra minúscula
        </li>
        <li className="flex">
          <img
            src={
              !hasError(
                "A senha deve conter pelo menos 3 caracteres especiais diferentes"
              )
                ? check
                : uncheck
            }
            alt=""
          />
          Três caracteres especiais diferentes
        </li>
        <li className="flex">
          <img
            src={
              !hasError("A senha deve ter pelo menos um número")
                ? check
                : uncheck
            }
            alt=""
          />
          Um número
        </li>
        <li className="flex items-center">
          <img src={passwordsMatch ? check : uncheck} alt="" />
          Confirmar senha igual
        </li>
      </ul>
    </div>
  );
}
