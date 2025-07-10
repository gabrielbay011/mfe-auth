import { useForm } from "react-hook-form";
import { SignUpFormType } from "../types/sign-up-form-type";
import { signUpFormSchema } from "../schemas/sign-up-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpUser } from "../services/sign-up-user";
import { useNavigate } from "react-router-dom";
import Button from "../../utils/components/button";
import Input from "../../utils/components/input";
import PasswordChecklist from "../validators/password-check-list";

export default function SignUp() {
  const navigate = useNavigate();

  //Inicialização do formulário de cadastro
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
  });

  const password = watch("password") || "";
  const confirmPassword = watch("confirmPassword") || "";

  //Função executada no envio do formulário e retorna sucesso ou erro no cadastro
  function handleSignUp(data: SignUpFormType) {
    try {
      signUpUser(data);
      reset();
      navigate("/signin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Erro: " + err.message);
      } else {
        alert("Erro inesperado no cadastro.");
      }
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="on"
        className="w-full max-w-sm"
      >
        {/* Campo do nome */}
        <Input
          label="Nome:"
          type="text"
          id="name"
          autoComplete="given-name"
          register={register("name", { required: true })}
          error={errors.name?.message}
        />

        {/* Campo do sobrenome */}
        <Input
          label="Sobrenome:"
          type="text"
          id="lastname"
          autoComplete="family-name"
          register={register("lastName", { required: true })}
          error={errors.lastName?.message}
        />

        {/* Campo do lucro mensal */}
        <Input
          label="Lucro mensal:"
          type="number"
          id="profit"
          autoComplete="off"
          register={register("profit", { valueAsNumber: true, required: true })}
          error={errors.profit?.message}
        />

        {/* Campo do email */}
        <Input
          label="E-mail:"
          type="email"
          id="email"
          autoComplete="email"
          register={register("email", { required: true })}
          error={errors.email?.message}
        />

        <div className="flex flex-col md:flex-row gap-5">
          {/* Campo da senha */}
          <Input
            label="Senha:"
            type="password"
            id="password"
            autoComplete="new-password"
            register={register("password", { required: true })}
          />

          {/* Campo de confirmar senha */}
          <Input
            label="Confirmar senha:"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            register={register("confirmPassword", { required: true })}
          />
        </div>

        <PasswordChecklist
          password={password}
          confirmPassword={confirmPassword}
        />

        <div className="mt-5 mb-5">
          <Button type="submit" styleType="submit">
            Cadastrar
          </Button>
        </div>
      </form>
    </>
  );
}
