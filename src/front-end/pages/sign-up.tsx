import { useForm } from "react-hook-form";
import { SignUpFormType } from "../../back-end/types/sign-up-form-type";
import { signUpFormSchema } from "../../back-end/schemas/sign-up-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpUser } from "../../back-end/services/sign-up-user";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  //Idem login
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
    <div>
      <form onSubmit={handleSubmit(handleSignUp)} autoComplete="on">
        <h1>Sign Up</h1>

        {/* Campo do nome */}
        <label htmlFor="name">Nome:</label>
        <br />
        <input
          type="text"
          id="name"
          autoComplete="given-name"
          {...register("name", { required: true })}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        <br />

        {/* Campo do sobrenome */}
        <label htmlFor="lastname">Sobrenome:</label>
        <br />
        <input
          type="text"
          id="lastname"
          autoComplete="family-name"
          {...register("lastName", { required: true })}
        />
        {errors.lastName && (
          <p style={{ color: "red" }}>{errors.lastName.message}</p>
        )}
        <br />

        {/* Campo do lucro mensal */}
        <label htmlFor="profit">Lucro Mensal:</label>
        <br />
        <input
          type="number"
          id="profit"
          autoComplete="off"
          {...register("profit", { valueAsNumber: true, required: true })}
        />
        {errors.profit && (
          <p style={{ color: "red" }}>{errors.profit.message}</p>
        )}
        <br />

        {/* Campo do email */}
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          id="email"
          autoComplete="email"
          {...register("email", { required: true })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        <br />

        {/* Campo da senha */}
        <label htmlFor="password">Senha:</label>
        <br />
        <input
          type="password"
          id="password"
          autoComplete="new-password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
        <br />

        {/* Campo de confirmar senha */}
        <label htmlFor="confirmpassword">Confirmar Senha:</label>
        <br />
        <input
          type="password"
          id="confirmpassword"
          autoComplete="new-password"
          {...register("confirmPassword", { required: true })}
        />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
        )}
        <br />

        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/signin">Já tenho cadatro</Link>
    </div>
  );
}
