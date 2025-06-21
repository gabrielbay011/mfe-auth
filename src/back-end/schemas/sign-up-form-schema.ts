import { z } from "zod";

export const signUpFormSchema = z
  .object({
    name: z
      .string()
      .min(3, "O nome deve ter pelo menos 3 caracteres")
      .regex(
        /^[A-Za-zÀ-ÿ']+$/,
        "Digite apenas o primeiro nome usando letras e acentos"
      ),
    lastName: z
      .string()
      .min(3, "O sobrenome deve ter pelo menos 3 caracteres")
      .regex(
        /^[A-Za-zÀ-ÿ' ]+$/,
        "O sobrenome deve conter apenas letras, acentos e hífen"
      )
      .refine(
        (val) => {
          const prohibited = ["de", "da", "do", "dos", "das"];
          const words = val.split(/[\s-]+/).map((w) => w.toLocaleLowerCase());

          return words.every(
            (word) => word.length >= 3 && !prohibited.includes(word)
          );
        },
        {
          message:
            "Cada parte do sobrenome deve ter pelo menos 3 caracteres e não pode conter 'de', 'da', etc",
        }
      ),
    profit: z
      .number({ invalid_type_error: "Informe um valor numérico" })
      .positive("O lucro mensal deve ser positivo")
      .max(1000, "O lucro mensal não pode passar de 1000"),
    email: z
      .string()
      .min(1, "O campo email é obrigatorio")
      .toLowerCase()
      .refine((val) => /^[a-z0-9@.]+$/.test(val), {
        message:
          "Só são permitidos letras minúsculas, números, @ e ponto final",
      })
      .refine((val) => val.includes("@"), {
        message: "O email deve conter '@'",
      })
      .refine(
        (val) => {
          const [_, fullDomain] = val.split("@");
          if (!fullDomain) return false;

          const [domain, extension] = fullDomain.split(".");
          return (
            ["gmail", "outlook", "yahoo", "baymetrics"].includes(domain) &&
            extension === "com"
          );
        },
        {
          message:
            "Domínio inválido. Use gmail, outlook, yahoo ou baymetrics, com '.com'",
        }
      ),
    password: z
      .string()
      .min(12, "A senha deve ter pelo menos 12 caracteres")
      .regex(/[0-9]/, "A senha deve ter pelo menos um número")
      .regex(/[A-Z]/, "A senha deve ter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve ter pelo menos uma letra minúscula")
      .refine(
        (val) => {
          const specials = val.match(/[^a-zA-Z0-9]/g) || [];
          const distincts = new Set(specials);
          return distincts.size >= 3;
        },
        {
          message:
            "A senha deve conter pelo menos 3 caracteres especiais diferentes",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
