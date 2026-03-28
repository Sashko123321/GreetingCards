import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <div className="max-w-lg rounded-3xl border border-gold-soft/60 bg-parchment/90 px-10 py-14 shadow-book backdrop-blur-sm">
        <p className="font-display text-4xl font-semibold text-gold-deep md:text-5xl">Привітальні листівки</p>
        <p className="mt-6 font-body text-lg leading-relaxed text-stone-600">
          Відкрийте посилання, яке вам надіслали — кожна листівка доступна лише за унікальним посиланням.
        </p>
        <p className="mt-4 font-body text-sm text-stone-500">
          Якщо ви адміністратор, перейдіть до панелі керування (посилання не публікується на сайті).
        </p>
        <Link
          to="/admin"
          className="mt-10 inline-block rounded-full border border-gold/40 bg-white/80 px-8 py-3 font-body text-sm font-semibold uppercase tracking-widest text-gold-deep shadow-innerWarm transition hover:bg-gold/10"
        >
          Адмін-панель
        </Link>
      </div>
    </div>
  );
}
