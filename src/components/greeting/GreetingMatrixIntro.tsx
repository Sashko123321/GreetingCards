import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { MatrixRain } from "./MatrixRain";
// import { PixelHeart } from "./PixelHeart";

function useLatest<T>(value: T) {
  const r = useRef(value);
  r.current = value;
  return r;
}

type Props = {
  title: string;
  onComplete: () => void;
};

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export function GreetingMatrixIntro({ title, onComplete }: Props) {
  const [count, setCount] = useState<3 | 2 | 1 | null>(null);
  const [wordVisible, setWordVisible] = useState(0);
  const [phase, setPhase] = useState<"boot" | "words" | "finale" | "out">("boot");
  // const [finaleLine, setFinaleLine] = useState(0);
  const [rainFade, setRainFade] = useState(1);
  const doneRef = useRef(false);
  const cancelledRef = useRef(false);
  const onCompleteRef = useLatest(onComplete);

  const words = useMemo(() => {
    const t = title.trim();
    if (!t) return ["Привітання"];
    return t.split(/\s+/).filter(Boolean);
  }, [title]);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onCompleteRef.current();
  };

  useEffect(() => {
    cancelledRef.current = false;
    doneRef.current = false;

    const go = async () => {
      const list = title.trim().split(/\s+/).filter(Boolean);
      const w = list.length ? list : ["Привітання"];

      setPhase("boot");
      setCount(null);
      setWordVisible(0);
      // setFinaleLine(0);
      setRainFade(1);

      await sleep(280);
      for (const n of [3, 2, 1] as const) {
        if (cancelledRef.current) return;
        setCount(n);
        await sleep(820);
      }
      if (cancelledRef.current) return;
      setCount(null);
      await sleep(220);
      setPhase("words");
        for (let i = 0; i < w.length; i++) {
            if (cancelledRef.current) return;

            // показати тільки одне слово
            setWordVisible(i);

            await sleep(700); // час показу слова

            // сховати
            setWordVisible(-1);

            await sleep(200); // пауза перед наступним
        }
      if (cancelledRef.current) return;
      await sleep(420);
      setPhase("finale");
      await sleep(400);
      // setFinaleLine(1);
      await sleep(700);
      // setFinaleLine(2);
      await sleep(900);
      setRainFade(0.2);
      setPhase("out");
      await sleep(650);
      if (cancelledRef.current) return;
      finish();
    };

    void go();
    return () => {
      cancelledRef.current = true;
    };
  }, [title]);

  useEffect(() => {
    const skip = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        cancelledRef.current = true;
        if (doneRef.current) return;
        doneRef.current = true;
        onCompleteRef.current();
      }
    };
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, []);

  // const showWordRow = phase !== "boot" && count === null && phase !== "out";
  // const showHeart = (phase === "words" || phase === "finale") && count === null;

  return (
    <motion.div
      layout={false}
      className="fixed inset-0 z-[100] overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
    >
      <MatrixRain intensity={rainFade} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-fuchsia-950/15 via-transparent to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />


      <div className="absolute inset-0 flex flex-col items-center justify-center px-3">
        <AnimatePresence mode="wait">
          {count !== null && (
            <motion.div
              key={count}
              initial={{ scale: 1.85, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.35, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="font-pixel text-[min(26vw,7.5rem)] leading-none text-[#ff4daf] [text-shadow:0_0_28px_rgba(255,20,147,0.95),0_0_60px_rgba(236,72,153,0.55)]"
            >
              {count}
            </motion.div>
          )}
        </AnimatePresence>
          {phase === "words" && count === null && (
              <div className="absolute inset-0 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                      {wordVisible >= 0 && (
                          <motion.div
                              key={wordVisible}
                              className="font-pixel text-[min(18vw,5rem)] leading-none text-[#ff4daf] text-center px-4
          [text-shadow:0_0_28px_rgba(255,20,147,0.95),0_0_60px_rgba(236,72,153,0.55)]"

                              initial={{ scale: 1.6, opacity: 0, filter: "blur(10px)" }}
                              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                              exit={{ scale: 0.6, opacity: 0, filter: "blur(8px)" }}

                              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          >
                              {words[wordVisible]}
                          </motion.div>
                      )}
                  </AnimatePresence>
              </div>
          )}
        {/*{showWordRow && (*/}
        {/*  <motion.div*/}
        {/*    className="relative z-[1] mt-8 flex max-w-[96vw] flex-wrap items-center justify-center gap-x-3 gap-y-4 text-center sm:gap-x-4"*/}
        {/*    initial={{ opacity: 0 }}*/}
        {/*    animate={{ opacity: 1 }}*/}
        {/*    transition={{ duration: 0.35 }}*/}
        {/*  >*/}
        {/*    {words.map((word, i) => (*/}
        {/*      <motion.span*/}
        {/*        key={`${i}-${word}`}*/}
        {/*        className="font-pixel text-[min(18vw,5rem)] leading-snug text-[#ff5fb8] [text-shadow:0_0_14px_rgba(255,20,147,0.85)]"*/}
        {/*        initial={{ opacity: 0, y: 22, scale: 0.85 }}*/}
        {/*        animate={*/}
        {/*            i === wordVisible*/}
        {/*            ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }*/}
        {/*            : { opacity: 0, y: 16 }*/}
        {/*        }*/}
        {/*        transition={{ duration: 0.42 }}*/}
        {/*      >*/}
        {/*        {word}*/}
        {/*      </motion.span>*/}
        {/*    ))}*/}
        {/*  </motion.div>*/}
        {/*)}*/}

        {/*{phase === "finale" && (*/}
        {/*  <motion.div*/}
        {/*    className="pointer-events-none absolute inset-0 z-0"*/}
        {/*    initial={{ opacity: 0 }}*/}
        {/*    animate={{ opacity: 1 }}*/}
        {/*  >*/}
        {/*    <motion.div*/}
        {/*      className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent shadow-[0_0_20px_rgba(244,114,182,0.95)]"*/}
        {/*      initial={{ top: "0%" }}*/}
        {/*      animate={{ top: "100%" }}*/}
        {/*      transition={{ duration: 1.85, ease: "linear" }}*/}
        {/*    />*/}
        {/*  </motion.div>*/}
        {/*)}*/}

        {/*{(phase === "finale" || phase === "out") && (*/}
        {/*  <div className="absolute bottom-[12%] left-0 right-0 z-[1] flex flex-col items-center gap-3 px-4 text-center">*/}
        {/*    {finaleLine >= 1 && (*/}
        {/*      <motion.p*/}
        {/*        className="font-pixel text-[0.45rem] uppercase tracking-[0.35em] text-pink-300/95 sm:text-[0.5rem] md:tracking-[0.45em]"*/}
        {/*        initial={{ opacity: 0, letterSpacing: "0.65em" }}*/}
        {/*        animate={{ opacity: 1, letterSpacing: "0.35em" }}*/}
        {/*        transition={{ duration: 0.5 }}*/}
        {/*      >*/}
        {/*        SYNC…*/}
        {/*      </motion.p>*/}
        {/*    )}*/}
        {/*    {finaleLine >= 2 && (*/}
        {/*      <motion.div*/}
        {/*        className="h-1 w-52 max-w-[78vw] overflow-hidden rounded-full bg-fuchsia-950/90 ring-1 ring-pink-500/50"*/}
        {/*        initial={{ opacity: 0, scaleX: 0.2 }}*/}
        {/*        animate={{ opacity: 1, scaleX: 1 }}*/}
        {/*        transition={{ duration: 0.35 }}*/}
        {/*      >*/}
        {/*        <motion.div*/}
        {/*          className="h-full bg-gradient-to-r from-fuchsia-600 via-pink-300 to-fuchsia-500"*/}
        {/*          initial={{ width: "0%" }}*/}
        {/*          animate={{ width: "100%" }}*/}
        {/*          transition={{ duration: 0.95, ease: "easeOut" }}*/}
        {/*        />*/}
        {/*      </motion.div>*/}
        {/*    )}*/}
        {/*    {finaleLine >= 2 && (*/}
        {/*      <motion.p*/}
        {/*        className="font-pixel text-[0.38rem] text-pink-200/90 sm:text-[0.42rem]"*/}
        {/*        initial={{ opacity: 0 }}*/}
        {/*        animate={{ opacity: [0.45, 1, 0.75, 1] }}*/}
        {/*        transition={{ duration: 1.2 }}*/}
        {/*      >*/}
        {/*        OK ✓*/}
        {/*      </motion.p>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*)}*/}

        <p className="absolute bottom-5 left-0 right-0 z-[1] text-center font-pixel text-[0.28rem] text-pink-500/65 sm:text-[0.32rem]">
          ESC · SPACE · ENTER — SKIP
        </p>
      </div>

      {phase === "out" && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-100 via-white to-amber-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.88 }}
          transition={{ duration: 0.55 }}
        />
      )}
    </motion.div>
  );
}
