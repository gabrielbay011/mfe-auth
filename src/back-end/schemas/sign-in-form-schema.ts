import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().min(1, "O campo email é obrigatório").toLowerCase(),
  password: z.string().min(1, "O campo senha é origatório"),
});
