import { z } from "zod";
import { signUpFormSchema } from "../schemas/sign-up-form-schema";

export type SignUpFormType = z.infer<typeof signUpFormSchema>;
