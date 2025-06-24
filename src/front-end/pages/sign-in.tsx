import { useForm } from "react-hook-form";
import { SignInFormType } from "../../back-end/types/sign-in-form-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormSchema } from "../../back-end/schemas/sign-in-form-schema";
import { signInWithMock } from "../../back-end/services/sign-in-user";
import { Link, useNavigate } from "react-router-dom";

//Página de Login
export default function SignIn() {
  const navigate = useNavigate();

  //Inicialização do formulário de login
  const {
    register, //Registra os campos do formulário
    handleSubmit, //Função que lida com o envio do formulário
    reset, //Função que reseta os campos do formulário
    formState: { errors }, //Objeto que armazena os erros de validação
  } = useForm<SignInFormType>({
    //Inicialização do formulário com a tipagem dos dados
    resolver: zodResolver(signInFormSchema), //Utiliza o zod para realizar as validações
  });

  //Função executada no envio do formulário e retorna sucesso ou erro no login
  async function onSubmit(data: SignInFormType) {
    try {
      const response = await signInWithMock(data.email, data.password);

      // eslint-disable-next-line no-console
      console.log(response);

      alert("Login realizado com sucesso");
      navigate("/home");
      reset();
    } catch (err: any) {
      alert("Erro: " + err.message);
    }
  }

  return (
    <div>
      {/* Formulário de  login utilizando react-hook-form e zod para validação */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign In</h1>

        {/* Campo do e-mail */}
        <label htmlFor="email">Email</label>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        <br />

        {/* Campo de senha */}
        <label htmlFor="password">Senha</label>
        <input type="password" {...register("password", { required: true })} />
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
