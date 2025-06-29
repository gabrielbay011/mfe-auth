import { z } from "zod";

//Validações dos campos do login
export const signInFormSchema = z.object({
  //Validação e-mail: campo obrigatório e converte em caracteres minúsculos
  email: z.string().min(1, "O campo email é obrigatório").toLowerCase(),
  //Validação senha: campo obrigatório
  password: z.string().min(1, "O campo senha é obrigatório"),
});
