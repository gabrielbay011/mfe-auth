import { useState } from "react";
import logo from "../../public/images/logo-sysflow.svg";
import SignIn from "../../sign-in/pages/sign-in";
import SignUp from "../../sign-up/pages/sign-up";
import imageLogin from "../../public/images/image-login.svg";

export default function Home() {
  const [signUpFormVisible, setSignUpFormVisible] = useState(true);
  const [signInFormVisible, setSignInFormVisible] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Logo */}
      <div className="flex justify-center lg:justify-start px-4 py-4 xl:pb-0">
        <img
          src={logo}
          alt="Logo SysFlow"
          className="md:max-w-[8%] lg:max-w-[5%] xl:max-w-[4%]"
        />
      </div>

      {/* Formulário e Imagem */}
      <div className="flex flex-col lg:flex-row flex-grow">
        <div className="w-full lg:w-1/2 flex justify-center items-center px-3">
          <div className="flex flex-col items-center w-full max-w-md">
            <div className="flex bg-purpleLight rounded-t-[20px] w-full">
              <button
                className={`w-1/2 hover:cursor-pointer font-bold p-1.5 rounded-tl-[20px] text-xl text-grayDark ${
                  signUpFormVisible
                    ? "bg-purpleLight"
                    : "bg-purplePrimary rounded-br-sm"
                }`}
                onClick={() => {
                  setSignUpFormVisible(true);
                  setSignInFormVisible(false);
                }}
              >
                Cadastro
              </button>
              <button
                className={`w-1/2 hover:cursor-pointer font-bold p-1.5 rounded-tr-[20px] text-xl text-grayDark ${
                  signInFormVisible
                    ? "bg-purpleLight"
                    : "bg-purplePrimary rounded-bl-sm"
                }`}
                onClick={() => {
                  setSignInFormVisible(true);
                  setSignUpFormVisible(false);
                }}
              >
                Login
              </button>
            </div>

            <div className="w-full flex justify-center bg-purpleLight rounded-b-[20px] mb-5">
              {signUpFormVisible ? (
                <SignUp
                  onSuccess={() => {
                    setSignUpFormVisible(false);
                    setSignInFormVisible(true);
                  }}
                />
              ) : (
                <SignIn />
              )}
            </div>
          </div>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center p-6">
          <img
            src={imageLogin}
            alt="Imagem Login"
            className="max-h-[90%] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
