//Tipo referente ao retorno da função de login
export type SignInResult = {
  message: string;
  user: {
    email: string;
  };
};
