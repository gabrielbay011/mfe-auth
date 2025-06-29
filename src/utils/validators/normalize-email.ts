//Função para remover os pontos do e-mail
export default function normalizeEmail(email: string): string {
  let result = email.toLocaleLowerCase();
  const [user, domain] = result.split("@");

  if (!user || !domain) {
    throw new Error("Formato de e-mail inválido");
  }

  const userWithoutDots = user.replace(/\./g, "");
  return `${userWithoutDots}@${domain}`;
}
