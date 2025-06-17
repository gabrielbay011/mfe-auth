import { useForm } from "react-hook-form";
import { SignInFormType } from "../../back-end/types/sign-in-form-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormSchema } from "../../back-end/schemas/sign-in-form-schema";
import { signInWithMock } from "../../back-end/services/sign-in-user";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
  });

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign In</h1>
        <label htmlFor="email">Email</label>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        <br />
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
