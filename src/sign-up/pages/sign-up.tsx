import { useForm } from "react-hook-form";
import { SignUpFormType } from "../types/sign-up-form-type";
import { signUpFormSchema } from "../schemas/sign-up-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpUser } from "../services/sign-up-user";
import { useNavigate } from "react-router-dom";
import Button from "../../utils/components/button";
import Input from "../../utils/components/input";

export default function SignUp() {
  const navigate = useNavigate();

  //Inicialização do formulário de cadastro
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
  });

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
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

        {/* Campo do sobrenome */}
        <Input
          label="Sobrenome:"
          type="text"
          id="lastname"
          autoComplete="family-name"
          register={register("lastName", { required: true })}
        />
        {errors.lastName && (
          <p style={{ color: "red" }}>{errors.lastName.message}</p>
        )}

        {/* Campo do lucro mensal */}
        <Input
          label="Lucro mensal:"
          type="number"
          id="profit"
          autoComplete="off"
          register={register("profit", { valueAsNumber: true, required: true })}
        />
        {errors.profit && (
          <p style={{ color: "red" }}>{errors.profit.message}</p>
        )}

        {/* Campo do email */}
        <Input
          label="E-mail:"
          type="email"
          id="email"
          autoComplete="email"
          register={register("email", { required: true })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        {/* Campo da senha */}
        <Input
          label="Senha:"
          type="password"
          id="password"
          autoComplete="new-password"
          register={register("password", { required: true })}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}

        {/* Campo de confirmar senha */}
        <Input
          label="Confirmar senha:"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          register={register("confirmPassword", { required: true })}
        />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
        )}

        <div className="mb-5 pr-6 pl-6 md:pr-1 md:pl-1">
          <Button type="submit">Cadastrar</Button>
        </div>
      </form>
    </>
  );
}
