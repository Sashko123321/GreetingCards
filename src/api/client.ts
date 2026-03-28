const apiBase = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

export type GreetingPublic = {
  recipientName: string;
  title: string;
  message: string;
  theme: string;
  photoUrls: string[];
  isOpened: boolean;
  expireAtUtc: string | null;
  isExpired: boolean;
};

export async function fetchGreeting(token: string): Promise<GreetingPublic> {
  const r = await fetch(`${apiBase}/api/greeting/${encodeURIComponent(token)}`);
  if (!r.ok) throw new Error("not_found");
  return r.json() as Promise<GreetingPublic>;
}

export async function markOpened(token: string): Promise<void> {
  await fetch(`${apiBase}/api/greeting/${encodeURIComponent(token)}/opened`, {
    method: "POST",
  });
}

export type AdminSummary = {
  id: string;
  token: string;
  recipientName: string;
  title: string;
  createdAtUtc: string;
  isOpened: boolean;
  photoCount: number;
};

export async function adminLogin(password: string): Promise<{ token: string; expiresAtUtc: string }> {
  const r = await fetch(`${apiBase}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!r.ok) throw new Error("unauthorized");
  return r.json();
}

export async function adminListGreetings(jwt: string): Promise<AdminSummary[]> {
  const r = await fetch(`${apiBase}/api/admin/greetings`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  if (!r.ok) throw new Error("failed");
  return r.json();
}

export async function adminCreateGreeting(
  jwt: string,
  form: FormData
): Promise<{ token: string; id: string }> {
  const r = await fetch(`${apiBase}/api/admin/greetings`, {
    method: "POST",
    headers: { Authorization: `Bearer ${jwt}` },
    body: form,
  });
  if (!r.ok) throw new Error("failed");
  return r.json();
}

export async function adminDeleteGreeting(jwt: string, id: string): Promise<void> {
  const r = await fetch(`${apiBase}/api/admin/greetings/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${jwt}` },
  });
  if (!r.ok) throw new Error("failed");
}

export function publicGreetingUrl(token: string): string {
  const origin = window.location.origin + window.location.pathname;
  return `${origin}#/greeting/${token}`;
}
