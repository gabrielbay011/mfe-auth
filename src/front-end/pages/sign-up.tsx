import { useForm } from "react-hook-form";
import { SignUpFormType } from "../../back-end/types/sign-up-form-type";
import { signUpFormSchema } from "../../back-end/schemas/sign-up-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpUser } from "../../back-end/services/sign-up-user";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
  });

  async function onSubmit(data: SignUpFormType) {
    try {
      await signUpUser(data);
      reset();
      navigate("/signin");
    } catch (err: any) {
      alert("Erro: " + err.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up</h1>
        <label htmlFor="name">Nome</label>
        <input type="text" {...register("name", { required: true })} />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        <br />
        <label htmlFor="lastname">Sobrenome</label>
        <input type="text" {...register("lastName", { required: true })} />
        {errors.lastName && (
          <p style={{ color: "red" }}>{errors.lastName.message}</p>
        )}
        <br />
        <label htmlFor="profit">Lucro Mensal</label>
        <input
          type="number"
          {...register("profit", { valueAsNumber: true, required: true })}
        />
        {errors.profit && (
          <p style={{ color: "red" }}>{errors.profit.message}</p>
        )}
        <br />
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
        <label htmlFor="confirmPassword">Confirmar Senha</label>
        <input
          type="password"
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
