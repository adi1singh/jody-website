import type { ChatGPTUser } from "../app/chatgpt-auth";

export type AdminAccess =
  | { allowed: true; user: ChatGPTUser }
  | { allowed: false; status: 401 | 403 | 503; reason: string };

/** Both inputs must be server-owned: platform identity and runtime configuration. */
export function getAdminAccess(user: ChatGPTUser | null, configuredEmails: string | undefined): AdminAccess {
  const allowedEmails = new Set((configuredEmails ?? "").split(/[,;\n]/).map((value) => value.trim().toLowerCase()).filter((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)));
  if (!allowedEmails.size) return { allowed: false, status: 503, reason: "Owner access has not been configured." };
  if (!user?.userId?.trim() || !user.email?.trim()) return { allowed: false, status: 401, reason: "Please sign in to view this page." };
  if (!allowedEmails.has(user.email.trim().toLowerCase())) return { allowed: false, status: 403, reason: "This account does not have access to enquiries." };
  return { allowed: true, user };
}
