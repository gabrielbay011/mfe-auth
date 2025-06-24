import { z } from "zod";
import { signInFormSchema } from "../schemas/sign-in-form-schema";

//Tipo do formulário de login
export type SignInFormType = z.infer<typeof signInFormSchema>;
