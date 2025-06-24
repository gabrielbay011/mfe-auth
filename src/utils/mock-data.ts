import sha512 from "crypto-js/sha512";

//Dados fictícios para testar as páginas
export const mockUsers = [
  {
    id: "1",
    email: "mikewillbento@gmail.com",
    passwordHash: sha512("Teste1234!@#").toString(),
    isAuthenticated: true,
    accessToken: "12345",
  },
];
