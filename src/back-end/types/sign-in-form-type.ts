import { z } from "zod";
import { signInFormSchema } from "../schemas/sign-in-form-schema";

export type SignInFormType = z.infer<typeof signInFormSchema>;
