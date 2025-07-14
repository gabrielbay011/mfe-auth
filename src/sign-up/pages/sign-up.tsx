import { useForm } from "react-hook-form";
import { SignUpFormType } from "../types/sign-up-form-type";
import { signUpFormSchema } from "../schemas/sign-up-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpUser } from "../services/sign-up-user";
import Button from "../../utils/components/button";
import Input from "../../utils/components/input";
import PasswordChecklist from "../validators/password-check-list";
import Modal from "../../utils/components/modal";
import { useState } from "react";
import iconUncheck from "../../public/images/icon-uncheck.svg";
import iconSuccess from "../../public/images/icon-success.svg";
import { SignUpProps } from "../types/sign-up-props";

export default function SignUp({ onSuccess }: SignUpProps) {
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

  //State reallcionado a modal de feedback
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"success" | "error">(
    "success"
  );

  //Função executada no envio do formulário e retorna sucesso ou erro no cadastro
  async function handleSignUp(data: SignUpFormType) {
    try {
      await signUpUser(data);
      setFeedbackType("success");
      setFeedbackMessage("Usuário cadastrado com sucesso!");
      setFeedbackModalOpen(true);
      setTimeout(() => {
        reset();
        setFeedbackModalOpen(false);
        onSuccess();
      }, 1000);
    } catch (err: unknown) {
      setFeedbackType("error");
      if (err instanceof Error) {
        setFeedbackMessage(err.message);
        setFeedbackModalOpen(true);
        setTimeout(() => {
          setFeedbackModalOpen(false);
        }, 1000);
      } else {
        setFeedbackMessage("Erro ao cadastrar usuário");
        setFeedbackModalOpen(true);
        setTimeout(() => {
          setFeedbackModalOpen(false);
        }, 1000);
      }
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="on"
        className="w-full max-w-sm relative"
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

        <div className="flex flex-col md:flex-row gap-5 m-4 md:ml-4 md:mr-4">
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

        <div className="md:m-5">
          <PasswordChecklist
            password={password}
            confirmPassword={confirmPassword}
          />
        </div>

        <div className="m-5">
          <Button type="submit" styleType="submit">
            Cadastrar
          </Button>
        </div>

        {/* Modal de feedback */}
        <Modal isOpen={feedbackModalOpen}>
          <div className="flex flex-col items-center justify-center text-center w-full h-full p-5 pt-10 pb-10">
            <div className="flex items-center justify-center gap-2">
              <img
                src={feedbackType === "success" ? iconSuccess : iconUncheck}
                alt={
                  feedbackType === "success"
                    ? "Ícone de Sucesso"
                    : "Ícone de Erro"
                }
              />
              <p className="text-base font-medium">{feedbackMessage}</p>
            </div>
          </div>
        </Modal>
      </form>
    </>
  );
}
