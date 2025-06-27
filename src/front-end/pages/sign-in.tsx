import { useForm } from "react-hook-form";
import { SignInFormType } from "../../back-end/types/sign-in-form-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormSchema } from "../../back-end/schemas/sign-in-form-schema";
import { signInWithMock } from "../../back-end/services/sign-in-user";
import { Link } from "react-router-dom";

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
    <div>
      {/* Formulário de  login utilizando react-hook-form e zod para validação */}
      <form onSubmit={handleSubmit(handleSignIn)} autoComplete="on">
        <h1>Sign In</h1>

        {/* Campo do e-mail */}
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

        {/* Campo de senha */}
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

        <button type="submit">Logar</button>
      </form>

      <Link to="/signup">Não tenho cadastro</Link>
    </div>
  );
}
