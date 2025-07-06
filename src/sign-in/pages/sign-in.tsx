import { useForm } from "react-hook-form";
import { SignInFormType } from "../types/sign-in-form-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormSchema } from "../schemas/sign-in-form-schema";
import { signInWithMock } from "../services/sign-in-user";
import Button from "../../utils/components/button";
import Input from "../../utils/components/input";
import iconAdd from "../../public/images/icon-add.svg";

//Página de Login
export default function SignIn() {
  //Inicialização do formulário de login
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
  });

  //Função executada no envio do formulário e retorna sucesso ou erro no login
  function handleSignIn(data: SignInFormType) {
    try {
      const response = signInWithMock(data.email, data.password);

      if (response) {
        alert("Login realizado com sucesso");
      }

      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Erro: " + err.message);
      } else {
        alert("Erro desconhecido no login.");
      }
    }
  }

  return (
    <>
      {/* Formulário de  login utilizando react-hook-form e zod para validação */}
      <form
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="on"
        className="w-full max-w-sm"
      >
        {/* Campo do e-mail */}
        <Input
          label="E-mail:"
          type="email"
          id="email"
          autoComplete="email"
          register={register("email", { required: true })}
          error={errors.email?.message}
        />

        {/* Campo de senha */}
        <Input
          label="Senha:"
          type="password"
          id="password"
          autoComplete="new-password"
          register={register("password", { required: true })}
          error={errors.password?.message}
        />

        <div className="mt-5 mb-5 pr-6 pl-6 md:pr-1 md:pl-1">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </>
  );
}
