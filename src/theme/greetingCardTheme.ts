export type ThemeId = "classic" | "birthday" | "wedding" | "newyear";

export function normalizeTheme(raw: string | undefined): ThemeId {
  const t = (raw ?? "classic").toLowerCase().trim();
  if (t === "birthday" || t === "wedding" || t === "newyear") return t;
  return "classic";
}

/** Усі класи Tailwind для листівки залежно від теми (адмінка: classic | birthday | wedding | newyear). */
export type GreetingCardTheme = {
  id: ThemeId;
  pageBg: string;
  cardShell: string;
  cardGradient: string;
  /** shimmer overlay — для темної теми слабший */
  cardShimmerOpacity: string;
  cornerAccent: string;
  dividerVia: string;
  photoWrap: string;
  photoInner: string;
  photoOverlay: string;
  photoCaption: string;
  coverTitle: string;
  coverRecipient: string;
  coverHint: string;
  coverArrow: string;
  messageText: string;
  messageFooter: string;
  navBtn: string;
  navMuted: string;
  hintBottom: string;
  progressActive: string;
  progressInactive: string;
  showBirthdayRibbon: boolean;
  showSparkles: boolean;
};

const classic: GreetingCardTheme = {
  id: "classic",
  pageBg: "min-h-screen bg-gradient-to-b from-[#f7f0e6] via-[#faf6ef] to-[#ebe0d4]",
  cardShell:
    "rounded-2xl border border-amber-200/70 bg-white/92 shadow-[0_28px_60px_-18px_rgba(88,60,20,0.28)] backdrop-blur-[2px]",
  cardGradient: "from-white/60 via-transparent to-amber-100/25",
  cardShimmerOpacity: "opacity-30",
  cornerAccent: "text-amber-700/45",
  dividerVia: "via-amber-500/75",
  photoWrap: "overflow-hidden rounded-2xl ring-1 ring-amber-200/50 shadow-inner",
  photoInner: "relative max-h-[70vh] w-full overflow-hidden bg-stone-900/5",
  photoOverlay: "bg-gradient-to-t from-amber-950/20 via-transparent to-white/15",
  photoCaption: "border-t border-amber-200/60 bg-[#fdfaf3]/95 px-4 py-2.5 text-center font-body text-xs text-amber-900/65",
  coverTitle: "font-display text-4xl font-semibold leading-tight text-[#6b4c1b] md:text-5xl",
  coverRecipient: "font-body text-xl text-stone-600 md:text-2xl",
  coverHint: "font-body text-sm uppercase tracking-[0.35em] text-[#8b6914]/90",
  coverArrow: "text-amber-600/70",
  messageText: "whitespace-pre-wrap font-display text-2xl leading-relaxed text-stone-800 md:text-3xl",
  messageFooter: "text-center font-body text-sm text-amber-800/55",
  navBtn:
    "rounded-full border border-amber-300/60 bg-white/95 px-6 py-3 font-body text-sm font-semibold text-[#6b4c1b] shadow-innerWarm transition enabled:hover:bg-amber-50 disabled:opacity-40",
  navMuted: "font-body text-sm tabular-nums text-stone-500",
  hintBottom: "text-center font-body text-xs text-stone-400",
  progressActive: "rgba(180, 134, 42, 0.95)",
  progressInactive: "rgba(214, 211, 209, 0.85)",
  showBirthdayRibbon: false,
  showSparkles: true,
};

const birthday: GreetingCardTheme = {
  id: "birthday",
  pageBg: "min-h-screen bg-gradient-to-br from-rose-50 via-fuchsia-50/40 to-amber-50",
  cardShell:
    "rounded-[1.75rem] border-2 border-pink-300/70 bg-gradient-to-br from-white via-rose-50/90 to-amber-50/80 shadow-[0_24px_56px_-12px_rgba(236,72,153,0.35)] backdrop-blur-sm",
  cardGradient: "from-white/70 via-transparent to-pink-200/20",
  cardShimmerOpacity: "opacity-35",
  cornerAccent: "text-pink-400/55",
  dividerVia: "via-pink-400/80",
  photoWrap: "overflow-hidden rounded-[1.5rem] ring-2 ring-pink-200/80 shadow-lg shadow-pink-200/35",
  photoInner: "relative max-h-[70vh] w-full overflow-hidden bg-pink-950/5",
  photoOverlay: "bg-gradient-to-t from-fuchsia-900/25 via-transparent to-pink-100/20",
  photoCaption:
    "border-t border-pink-200/70 bg-gradient-to-r from-rose-50/98 to-amber-50/95 px-4 py-2.5 text-center font-body text-xs font-medium text-pink-900/70",
  coverTitle: "font-display text-4xl font-semibold leading-tight text-pink-700 md:text-5xl",
  coverRecipient: "font-body text-xl text-rose-700/90 md:text-2xl",
  coverHint: "font-body text-sm uppercase tracking-[0.3em] text-fuchsia-700/85",
  coverArrow: "text-pink-500/80",
  messageText: "whitespace-pre-wrap font-display text-2xl leading-relaxed text-rose-900/95 md:text-3xl",
  messageFooter: "text-center font-body text-sm text-pink-600/70",
  navBtn:
    "rounded-full border-2 border-pink-300/70 bg-white/95 px-6 py-3 font-body text-sm font-semibold text-pink-700 shadow-md shadow-pink-200/40 transition enabled:hover:bg-pink-50 disabled:opacity-40",
  navMuted: "font-body text-sm tabular-nums text-pink-400/80",
  hintBottom: "text-center font-body text-xs text-pink-400/80",
  progressActive: "rgba(236, 72, 153, 0.95)",
  progressInactive: "rgba(251, 207, 232, 0.9)",
  showBirthdayRibbon: true,
  showSparkles: true,
};

const wedding: GreetingCardTheme = {
  id: "wedding",
  pageBg: "min-h-screen bg-gradient-to-b from-stone-100 via-rose-50/50 to-amber-50/40",
  cardShell:
    "rounded-2xl border border-rose-200/90 bg-white/95 shadow-[0_25px_50px_-12px_rgba(190,120,120,0.22)] ring-1 ring-rose-100/80 backdrop-blur-sm",
  cardGradient: "from-white/80 via-rose-50/30 to-stone-100/40",
  cardShimmerOpacity: "opacity-25",
  cornerAccent: "text-rose-300/60",
  dividerVia: "via-rose-400/60",
  photoWrap: "overflow-hidden rounded-2xl ring-2 ring-rose-100 shadow-[0_12px_40px_-8px_rgba(190,120,120,0.25)]",
  photoInner: "relative max-h-[70vh] w-full overflow-hidden bg-rose-950/5",
  photoOverlay: "bg-gradient-to-t from-rose-900/15 via-transparent to-white/25",
  photoCaption:
    "border-t border-rose-200/70 bg-[#fffdfb]/98 px-4 py-2.5 text-center font-body text-xs tracking-wide text-rose-900/55",
  coverTitle: "font-display text-4xl font-semibold leading-tight text-rose-900/90 md:text-5xl",
  coverRecipient: "font-body text-xl text-rose-800/80 md:text-2xl",
  coverHint: "font-body text-sm uppercase tracking-[0.4em] text-rose-600/75",
  coverArrow: "text-rose-400/75",
  messageText: "whitespace-pre-wrap font-display text-2xl leading-relaxed text-stone-800 md:text-3xl",
  messageFooter: "text-center font-body text-sm text-rose-700/55",
  navBtn:
    "rounded-full border border-rose-300/70 bg-white/95 px-6 py-3 font-body text-sm font-semibold text-rose-900/85 shadow-sm transition enabled:hover:bg-rose-50 disabled:opacity-40",
  navMuted: "font-body text-sm tabular-nums text-rose-400/90",
  hintBottom: "text-center font-body text-xs text-rose-400/75",
  progressActive: "rgba(225, 120, 130, 0.95)",
  progressInactive: "rgba(254, 228, 230, 0.95)",
  showBirthdayRibbon: false,
  showSparkles: true,
};

const newyear: GreetingCardTheme = {
  id: "newyear",
  pageBg: "min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900",
  cardShell:
    "rounded-2xl border border-slate-500/40 bg-slate-900/88 shadow-[0_28px_64px_-12px_rgba(15,23,42,0.65)] ring-1 ring-white/10 backdrop-blur-md",
  cardGradient: "from-slate-700/25 via-transparent to-indigo-500/15",
  cardShimmerOpacity: "opacity-15",
  cornerAccent: "text-amber-200/35",
  dividerVia: "via-amber-200/50",
  photoWrap: "overflow-hidden rounded-xl border border-white/15 shadow-[0_0_32px_rgba(59,130,246,0.12)] ring-1 ring-white/10",
  photoInner: "relative max-h-[70vh] w-full overflow-hidden bg-slate-950",
  photoOverlay: "bg-gradient-to-t from-slate-950/50 via-transparent to-indigo-300/10",
  photoCaption:
    "border-t border-white/10 bg-slate-950/90 px-4 py-2.5 text-center font-body text-xs text-slate-300/90",
  coverTitle: "font-display text-4xl font-semibold leading-tight text-amber-100 md:text-5xl [text-shadow:0_0_40px_rgba(250,204,21,0.25)]",
  coverRecipient: "font-body text-xl text-slate-300 md:text-2xl",
  coverHint: "font-body text-sm uppercase tracking-[0.35em] text-amber-200/80",
  coverArrow: "text-amber-300/70",
  messageText: "whitespace-pre-wrap font-display text-2xl leading-relaxed text-slate-100 md:text-3xl",
  messageFooter: "text-center font-body text-sm text-amber-200/60",
  navBtn:
    "rounded-full border border-white/20 bg-slate-800/90 px-6 py-3 font-body text-sm font-semibold text-amber-100 shadow-[0_0_20px_rgba(250,204,21,0.12)] transition enabled:hover:bg-slate-700 disabled:opacity-40",
  navMuted: "font-body text-sm tabular-nums text-slate-500",
  hintBottom: "text-center font-body text-xs text-slate-500",
  progressActive: "rgba(250, 204, 21, 0.95)",
  progressInactive: "rgba(71, 85, 105, 0.9)",
  showBirthdayRibbon: false,
  showSparkles: true,
};

const themes: Record<ThemeId, GreetingCardTheme> = {
  classic,
  birthday,
  wedding,
  newyear,
};

export function getGreetingCardTheme(theme: string | undefined): GreetingCardTheme {
  return themes[normalizeTheme(theme)];
}
