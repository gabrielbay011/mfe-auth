import { z } from "zod";
import { signUpFormSchema } from "../schemas/sign-up-form-schema";

//Tipo do formulário de cadastro
export type SignUpFormType = z.infer<typeof signUpFormSchema>;
