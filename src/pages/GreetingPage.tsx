import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGreeting, markOpened, type GreetingPublic } from "../api/client";
import { AnimatedBackdrop } from "../components/greeting/AnimatedBackdrop";
import { BirthdayRibbon } from "../components/greeting/BirthdayRibbon";
import { CardCornerFlourishes, GoldFoilDivider } from "../components/greeting/CardOrnaments";
import { FloatingSparkles } from "../components/greeting/FloatingSparkles";
import { GreetingMatrixIntro } from "../components/greeting/GreetingMatrixIntro";
import { LoadingEnvelope } from "../components/greeting/LoadingEnvelope";
import { bookPageVariants, flipTransition } from "../components/greeting/pageFlipVariants";
import { ProgressDots } from "../components/greeting/ProgressDots";
import { getGreetingCardTheme } from "../theme/greetingCardTheme";

type PageKind = { type: "cover" } | { type: "photo"; url: string; index: number } | { type: "message" };

const coverLineVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const coverItemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function GreetingPage() {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<GreetingPublic | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [flipDir, setFlipDir] = useState<1 | -1>(1);
  const [introDone, setIntroDone] = useState(false);
  const markOnce = useRef(false);

  const handleIntroComplete = useCallback(() => setIntroDone(true), []);

  useEffect(() => {
    setIntroDone(false);
    setPage(0);
    markOnce.current = false;
  }, [token]);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      try {
        const g = await fetchGreeting(token);
        if (!cancelled) {
          setData(g);
          setErr(null);
        }
      } catch {
        if (!cancelled) {
          setErr("not_found");
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  useEffect(() => {
    if (!token || !data || !introDone || markOnce.current) return;
    markOnce.current = true;
    void markOpened(token).catch(() => {
      /* ignore */
    });
  }, [token, data, introDone]);

  const pages: PageKind[] = useMemo(() => {
    if (!data) return [];
    const list: PageKind[] = [{ type: "cover" }];
    data.photoUrls.forEach((url, i) => list.push({ type: "photo", url, index: i }));
    list.push({ type: "message" });
    return list;
  }, [data]);

  const total = pages.length;
  const canPrev = page > 0;
  const canNext = page < total - 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!introDone) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        setFlipDir(1);
        setPage((p) => Math.min(p + 1, Math.max(0, pages.length - 1)));
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        setFlipDir(-1);
        setPage((p) => Math.max(p - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pages.length, introDone]);

  function goNext() {
    if (!canNext) return;
    setFlipDir(1);
    setPage((p) => p + 1);
  }

  function goPrev() {
    if (!canPrev) return;
    setFlipDir(-1);
    setPage((p) => p - 1);
  }

  function goTo(i: number) {
    if (i === page || i < 0 || i >= total) return;
    setFlipDir(i > page ? 1 : -1);
    setPage(i);
  }

  if (loading) {
    return <LoadingEnvelope />;
  }

  if (err || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.p
          className="font-display text-3xl text-gold-deep"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Листівку не знайдено
        </motion.p>
        <p className="mt-4 max-w-md font-body text-stone-600">
          Перевірте посилання. Кожна листівка відкривається лише за своїм унікальним посиланням.
        </p>
      </div>
    );
  }

  if (data.isExpired) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-3xl text-gold-deep">Термін дії минув</p>
        <p className="mt-4 font-body text-stone-600">Це привітання більше недоступне.</p>
      </div>
    );
  }

  const current = pages[page];
  const theme = getGreetingCardTheme(data.theme);
  const showSparkles =
    theme.showSparkles && (current?.type === "cover" || current?.type === "message");
  const showBirthdayRibbon = theme.showBirthdayRibbon && current?.type === "cover";

  return (
    <>
      <AnimatePresence mode="wait">
        {!introDone && (
          <GreetingMatrixIntro key="matrix-intro" title={data.title} onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {introDone && (
        <motion.div
          className={`relative px-4 py-10 md:px-8 ${theme.pageBg}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatedBackdrop theme={data.theme} />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
        <motion.div
          className="perspective-book relative w-full max-w-xl cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          onDragEnd={(_, info) => {
            const t = info.offset.x + info.velocity.x * 0.2;
            if (t < -52) {
              setFlipDir(1);
              setPage((p) => Math.min(p + 1, total - 1));
            } else if (t > 52) {
              setFlipDir(-1);
              setPage((p) => Math.max(p - 1, 0));
            }
          }}
        >
          <AnimatePresence mode="wait" custom={flipDir}>
            <motion.div
              key={page}
              role="tabpanel"
              custom={flipDir}
              variants={bookPageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={flipTransition}
              className={`page-3d relative origin-center backdrop-blur-[2px] ${theme.cardShell}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className={`pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br ${theme.cardGradient}`}
              />
              <div
                className={`pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay card-foil-shimmer ${theme.cardShimmerOpacity}`}
              />
              <CardCornerFlourishes accentClassName={theme.cornerAccent} />
              {showSparkles && <FloatingSparkles themeId={theme.id} />}
              {showBirthdayRibbon && <BirthdayRibbon />}

              {current?.type === "cover" && (
                <motion.div
                  className="relative flex min-h-[420px] flex-col items-center justify-center gap-6 px-8 py-14 text-center md:min-h-[480px]"
                  variants={coverLineVariants}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={coverItemVariants} className="w-full max-w-xs">
                    <GoldFoilDivider viaClassName={theme.dividerVia} />
                  </motion.div>
                  <motion.h1 variants={coverItemVariants} className={theme.coverTitle}>
                    {data.title}
                  </motion.h1>
                  <motion.p variants={coverItemVariants} className={theme.coverRecipient}>
                    Для {data.recipientName}
                  </motion.p>
                  <motion.div variants={coverItemVariants} className="w-full max-w-xs">
                    <GoldFoilDivider viaClassName={theme.dividerVia} />
                  </motion.div>
                  <motion.p variants={coverItemVariants} className={theme.coverHint}>
                    Гортайте або свайпніть
                  </motion.p>
                  <motion.div
                    className="mt-2 flex gap-1"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden
                  >
                    <span className={theme.coverArrow}>↓</span>
                  </motion.div>
                </motion.div>
              )}

              {current?.type === "photo" && (
                <div className={theme.photoWrap}>
                  <div className={theme.photoInner}>
                    <motion.img
                      src={current.url}
                      alt=""
                      className="max-h-[70vh] w-full object-cover"
                      loading="lazy"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 9, ease: "linear" }}
                    />
                    <motion.div
                      className={`pointer-events-none absolute inset-0 ${theme.photoOverlay}`}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: [0.35, 0.55, 0.35] }}
                      transition={{ duration: 6, repeat: Infinity }}
                    />
                  </div>
                  <div className={theme.photoCaption}>
                    Фото {current.index + 1} з {data.photoUrls.length}
                  </div>
                </div>
              )}

              {current?.type === "message" && (
                <motion.div
                  className="relative flex min-h-[420px] flex-col justify-center gap-6 px-8 py-14 md:min-h-[480px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <GoldFoilDivider viaClassName={theme.dividerVia} />
                  <motion.p
                    className={theme.messageText}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {data.message}
                  </motion.p>
                  <GoldFoilDivider viaClassName={theme.dividerVia} />
                  <motion.p
                    className={theme.messageFooter}
                    animate={{ opacity: [0.55, 1, 0.55] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    З любов&apos;ю ✦
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="mt-8 w-full max-w-xl">
          <ProgressDots
            total={total}
            active={page}
            onSelect={goTo}
            activeColor={theme.progressActive}
            inactiveColor={theme.progressInactive}
          />
        </div>

        <div className="mt-8 flex w-full max-w-xl items-center justify-between gap-4">
          <motion.button
            type="button"
            disabled={!canPrev}
            onClick={goPrev}
            whileHover={canPrev ? { scale: 1.04, y: -1 } : undefined}
            whileTap={canPrev ? { scale: 0.97 } : undefined}
            className={`${theme.navBtn} disabled:cursor-not-allowed`}
          >
            Назад
          </motion.button>
          <span className={theme.navMuted}>
            {page + 1} / {total}
          </span>
          <motion.button
            type="button"
            disabled={!canNext}
            onClick={goNext}
            whileHover={canNext ? { scale: 1.04, y: -1 } : undefined}
            whileTap={canNext ? { scale: 0.97 } : undefined}
            className={`${theme.navBtn} disabled:cursor-not-allowed`}
          >
            Далі
          </motion.button>
        </div>
        <p className={`mt-4 ${theme.hintBottom}`}>Стрілки ← → · свайп</p>
          </div>
        </motion.div>
      )}
    </>
  );
}
