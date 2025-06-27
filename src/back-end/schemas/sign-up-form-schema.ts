import { z } from "zod";

//Validações dos campos do cadastro
export const signUpFormSchema = z
  .object({
    //Validação nome: minímo de 3 caracteres, apenas letras e acentos
    name: z
      .string()
      .min(3, "O nome deve ter pelo menos 3 caracteres")
      .regex(
        /^[A-Za-zÀ-ÿ']+$/,
        "Digite apenas o primeiro nome usando letras e acentos"
      ),
    //Validação sobrenome: minímo de 3 caracteres, apenas letras e acentos e não pode conter 'de', 'da', etc
    lastName: z
      .string()
      .min(3, "O sobrenome deve ter pelo menos 3 caracteres")
      .regex(
        /^[A-Za-zÀ-ÿ' ]+$/,
        "O sobrenome deve conter apenas letras, acentos e hífen"
      )
      .refine(
        (val) => {
          const prohibitedWords = ["de", "da", "do", "dos", "das"];
          const words = val.split(/[\s-]+/).map((w) => w.toLocaleLowerCase());

          return words.every(
            (word) => word.length >= 3 && !prohibitedWords.includes(word)
          );
        },
        {
          message:
            "Cada parte do sobrenome deve ter pelo menos 3 caracteres e não pode conter 'de', 'da', etc",
        }
      ),
    //Validação lucro: apenas valor númerio, nuémro positivo e saldo até 1000
    profit: z
      .number({ invalid_type_error: "Informe um valor numérico" })
      .positive("O lucro mensal deve ser positivo")
      .max(1000, "O lucro mensal não pode passar de 1000"),
    //Validação e-mail: campo obrigatório, apenas letras minúsculas, números, '@' e ponto final e domínios específicos
    email: z
      .string()
      .min(1, "O campo email é obrigatório")
      .toLowerCase()
      .refine((val) => /^[a-z0-9@.]+$/.test(val), {
        message:
          "Só são permitidos letras minúsculas, números, '@' e ponto final",
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
    //Validação senha: minímo de 12 caracteres, deve conter número, letra maiúscula, letra minúscula e caracter especial
    password: z
      .string()
      .min(12, "A senha deve ter pelo menos 12 caracteres")
      .regex(/[0-9]/, "A senha deve ter pelo menos um número")
      .regex(/[A-Z]/, "A senha deve ter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve ter pelo menos uma letra minúscula")
      .refine(
        (val) => {
          const specialsCharacter = val.match(/[^a-zA-Z0-9]/g) || [];
          const distinctsCharacter = new Set(specialsCharacter);
          return distinctsCharacter.size >= 3;
        },
        {
          message:
            "A senha deve conter pelo menos 3 caracteres especiais diferentes",
        }
      ),
    //Validação confirmar senha: verifica se as senhas coincidem
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
