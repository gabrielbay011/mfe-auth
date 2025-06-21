import { mockUsers } from "../../utils/mock-data";

export default function normalizeEmail(email: string) {
  let result = email.toLocaleLowerCase();
  const [user, domain] = result.split("@");
  const userWithoutDots = user.replace(/\./g, "");
  return `${userWithoutDots}@${domain}`;
}

export function emailAlreadyExists(email: string): boolean {
  const normalizedEmail = normalizeEmail(email);
  return mockUsers.some((user) => user.email === normalizedEmail);
}
