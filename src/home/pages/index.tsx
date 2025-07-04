import { useState } from "react";
import logo from "../../public/images/logo-sysflow.svg";
import SignIn from "../../sign-in/pages/sign-in";
import SignUp from "../../sign-up/pages/sign-up";
import imageLogin from "../../public/images/image-login.svg";

export default function Home() {
  const [signUpFormVisible, setSignUpFormVisible] = useState(true);
  const [signInFormVisible, setSignInFormVisible] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="m-5">
        <img src={logo} alt="Logo SysFlow" />
      </div>
      <div className="flex flex-col items-center w-full max-w-md">
        <div className="flex bg-purpleLight rounded-t-lg w-full">
          <div className="flex w-full">
            <button
              className={`w-1/2 hover:cursor-pointer ${
                signUpFormVisible == true
                  ? "bg-purpleLight rounded-tl-lg font-bold p-3"
                  : "bg-purplePrimary rounded-br-sm rounded-tl-lg font-bold p-3"
              }`}
              onClick={() => {
                setSignUpFormVisible(true);
                setSignInFormVisible(false);
              }}
            >
              Cadastro
            </button>
            <button
              className={`w-1/2 hover:cursor-pointer ${
                signInFormVisible == true
                  ? "bg-purpleLight rounded-tr-lg font-bold p-3"
                  : "bg-purplePrimary rounded-bl-sm rounded-tr-lg font-bold p-3"
              }`}
              onClick={() => {
                setSignInFormVisible(true);
                setSignUpFormVisible(false);
              }}
            >
              Login
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center bg-purpleLight rounded-b-lg mb-5">
          {signUpFormVisible == true ? <SignUp /> : <SignIn />}
        </div>
      </div>
      <div className="hidden lg:block">
        <img src={imageLogin} alt="Imagem Login" />
      </div>
    </div>
  );
}
