import { QRCodeSVG } from "qrcode.react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  adminCreateGreeting,
  adminDeleteGreeting,
  adminListGreetings,
  adminLogin,
  type AdminSummary,
  publicGreetingUrl,
} from "../api/client";

const TOKEN_KEY = "gc_admin_jwt";

export function AdminPage() {
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [list, setList] = useState<AdminSummary[]>([]);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [recipientName, setRecipientName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("classic");
  const [expireAt, setExpireAt] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [createdToken, setCreatedToken] = useState<string | null>(null);

  const greetingLink = useMemo(
    () => (createdToken ? publicGreetingUrl(createdToken) : ""),
    [createdToken]
  );

  async function refresh(j: string) {
    setLoadErr(null);
    try {
      const rows = await adminListGreetings(j);
      setList(rows);
    } catch {
      setLoadErr("Не вдалося завантажити список. Перевірте VITE_API_URL та CORS.");
      setJwt(null);
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  useEffect(() => {
    if (jwt) void refresh(jwt);
  }, [jwt]);

  async function onLogin(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setLoadErr(null);
    try {
      const res = await adminLogin(password);
      localStorage.setItem(TOKEN_KEY, res.token);
      setJwt(res.token);
      setPassword("");
    } catch {
      setLoadErr("Невірний пароль або сервер недоступний.");
    } finally {
      setBusy(false);
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setJwt(null);
    setList([]);
    setCreatedToken(null);
  }

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    if (!jwt) return;
    if (files.length > 10) {
      setLoadErr("Не більше 10 фото.");
      return;
    }
    setBusy(true);
    setLoadErr(null);
    try {
      const fd = new FormData();
      fd.append("recipientName", recipientName);
      fd.append("title", title);
      fd.append("message", message);
      fd.append("theme", theme);
      if (expireAt) fd.append("expireAtUtc", new Date(expireAt).toISOString());
      files.forEach((f) => fd.append("photos", f));
      const res = await adminCreateGreeting(jwt, fd);
      setCreatedToken(res.token);
      setRecipientName("");
      setTitle("");
      setMessage("");
      setFiles([]);
      setExpireAt("");
      await refresh(jwt);
    } catch {
      setLoadErr("Не вдалося створити листівку.");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(id: string) {
    if (!jwt || !confirm("Видалити листівку?")) return;
    setBusy(true);
    try {
      await adminDeleteGreeting(jwt, id);
      await refresh(jwt);
    } catch {
      setLoadErr("Не вдалося видалити.");
    } finally {
      setBusy(false);
    }
  }

  async function copyLink() {
    if (!greetingLink) return;
    await navigator.clipboard.writeText(greetingLink);
  }

  if (!jwt) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <form
          onSubmit={onLogin}
          className="w-full max-w-md rounded-3xl border border-gold-soft/50 bg-white/90 p-10 shadow-book"
        >
          <h1 className="font-display text-3xl text-gold-deep">Адмін</h1>
          <p className="mt-2 font-body text-sm text-stone-500">Вхід за паролем з appsettings (сервер).</p>
          <label className="mt-8 block font-body text-sm font-medium text-stone-700">
            Пароль
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 font-body outline-none ring-gold/30 focus:ring-2"
              autoComplete="current-password"
            />
          </label>
          {loadErr && <p className="mt-4 font-body text-sm text-red-600">{loadErr}</p>}
          <button
            type="submit"
            disabled={busy}
            className="mt-8 w-full rounded-full bg-gold-deep py-3 font-body font-semibold text-white shadow-innerWarm transition hover:bg-gold-deep/90 disabled:opacity-50"
          >
            Увійти
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 md:px-10">
      <div className="mx-auto max-w-4xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-3xl text-gold-deep">Панель листівок</h1>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-stone-200 px-5 py-2 font-body text-sm text-stone-600 hover:bg-stone-50"
          >
            Вийти
          </button>
        </header>

        {loadErr && <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 font-body text-sm text-red-700">{loadErr}</p>}

        <section className="mt-10 grid gap-10 lg:grid-cols-2">
          <form
            onSubmit={onCreate}
            className="rounded-3xl border border-gold-soft/40 bg-white/90 p-8 shadow-innerWarm"
          >
            <h2 className="font-display text-2xl text-gold-deep">Нова листівка</h2>
            <label className="mt-6 block font-body text-sm font-medium text-stone-700">
              Ім&apos;я отримувача
              <input
                required
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-2 font-body outline-none focus:ring-2 focus:ring-gold/30"
              />
            </label>
            <label className="mt-4 block font-body text-sm font-medium text-stone-700">
              Заголовок
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-2 font-body outline-none focus:ring-2 focus:ring-gold/30"
              />
            </label>
            <label className="mt-4 block font-body text-sm font-medium text-stone-700">
              Текст привітання
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-2 font-body outline-none focus:ring-2 focus:ring-gold/30"
              />
            </label>
            <label className="mt-4 block font-body text-sm font-medium text-stone-700">
              Тема (оформлення)
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-2 font-body outline-none focus:ring-2 focus:ring-gold/30"
              >
                <option value="classic">Класична</option>
                <option value="birthday">День народження</option>
                <option value="wedding">Весілля</option>
                <option value="newyear">Новий рік</option>
              </select>
            </label>
            <label className="mt-4 block font-body text-sm font-medium text-stone-700">
              Закінчення дії (необов&apos;язково)
              <input
                type="datetime-local"
                value={expireAt}
                onChange={(e) => setExpireAt(e.target.value)}
                className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-2 font-body outline-none focus:ring-2 focus:ring-gold/30"
              />
            </label>
            <label className="mt-4 block font-body text-sm font-medium text-stone-700">
              Фото (до 10, стискаються на сервері)
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, 10))}
                className="mt-2 w-full font-body text-sm"
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="mt-8 w-full rounded-full bg-gold-deep py-3 font-body font-semibold text-white shadow-innerWarm transition hover:bg-gold-deep/90 disabled:opacity-50"
            >
              Створити
            </button>
          </form>

          <div className="rounded-3xl border border-gold-soft/40 bg-parchment/80 p-8 shadow-innerWarm">
            <h2 className="font-display text-2xl text-gold-deep">Посилання та QR</h2>
            {createdToken ? (
              <div className="mt-6 flex flex-col items-center gap-6">
                <div className="rounded-2xl bg-white p-4 shadow-innerWarm">
                  <QRCodeSVG value={greetingLink} size={200} level="M" includeMargin />
                </div>
                <p className="break-all text-center font-body text-xs text-stone-600">{greetingLink}</p>
                <button
                  type="button"
                  onClick={() => void copyLink()}
                  className="rounded-full border border-gold/40 bg-white px-6 py-2 font-body text-sm font-semibold text-gold-deep hover:bg-gold/10"
                >
                  Копіювати посилання
                </button>
              </div>
            ) : (
              <p className="mt-6 font-body text-stone-600">
                Після створення листівки тут з&apos;явиться QR-код і посилання для надсилання.
              </p>
            )}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl text-gold-deep">Створені листівки</h2>
          <ul className="mt-6 space-y-4">
            {list.map((g) => (
              <li
                key={g.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-200/80 bg-white/90 px-5 py-4 shadow-innerWarm"
              >
                <div>
                  <p className="font-display text-lg text-gold-deep">{g.title}</p>
                  <p className="font-body text-sm text-stone-600">
                    {g.recipientName} · {g.photoCount} фото ·{" "}
                    {g.isOpened ? "відкрито" : "ще не відкрито"}
                  </p>
                  <p className="mt-1 font-mono text-xs text-stone-500">{publicGreetingUrl(g.token)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => void onDelete(g.id)}
                  disabled={busy}
                  className="rounded-full border border-red-200 px-4 py-2 font-body text-sm text-red-700 hover:bg-red-50 disabled:opacity-50"
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
