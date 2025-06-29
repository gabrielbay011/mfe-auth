//Tipo referente ao user
export type User = {
  id: string;
  email: string;
  passwordHash: string;
  isAuthenticated: boolean;
  accessToken: string;
};
