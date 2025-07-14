import { useForm } from "react-hook-form";
import { SignInFormType } from "../types/sign-in-form-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormSchema } from "../schemas/sign-in-form-schema";
import { signInUser } from "../services/sign-in-user";
import Button from "../../utils/components/button";
import Input from "../../utils/components/input";
import { useState } from "react";
import iconUncheck from "../../public/images/icon-uncheck.svg";
import iconSuccess from "../../public/images/icon-success.svg";
import Modal from "../../utils/components/modal";

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

  //State reallcionado a modal de feedback
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"success" | "error">(
    "success"
  );

  //Função executada no envio do formulário e retorna sucesso ou erro no login
  function handleSignIn(data: SignInFormType) {
    try {
      const response = signInUser(data.email, data.password);

      if (response) {
        setFeedbackType("success");
        setFeedbackMessage("Login efetuado com sucesso!");
        setFeedbackModalOpen(true);
      }

      reset();
      setTimeout(() => {
        setFeedbackModalOpen(false);
        window.location.pathname = "/buildings";
      }, 1000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFeedbackType("error");
        setFeedbackMessage(err.message);
        setFeedbackModalOpen(true);
        setTimeout(() => {
          setFeedbackModalOpen(false);
        }, 1000);
      } else {
        setFeedbackType("error");
        setFeedbackMessage("Erro ao efetuar o login");
        setFeedbackModalOpen(true);
        setTimeout(() => {
          setFeedbackModalOpen(false);
        }, 1000);
      }
    }
  }

  return (
    <>
      {/* Formulário de  login utilizando react-hook-form e zod para validação */}
      <form
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="on"
        className="w-full max-w-sm relative"
      >
        {/* Campo do e-mail */}
        <Input
          label="E-mail:"
          type="email"
          id="email"
          autoComplete="email"
          register={register("email")}
          error={errors.email?.message}
        />

        {/* Campo de senha */}
        <div className="m-4">
          <Input
            label="Senha:"
            type="password"
            id="password"
            autoComplete="new-password"
            register={register("password")}
            error={errors.password?.message}
          />
        </div>

        <div className="m-5">
          <Button type="submit" styleType="submit">
            Login
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
