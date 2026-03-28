import { useEffect, useRef } from "react";

/** Латиниця + цифри + символи — як у «рожевому» Matrix (референс madeforanita). */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

type Props = {
  /** 0–1, згасання інтро */
  intensity?: number;
};

type Star = { x: number; y: number; r: number; ph: number; sp: number };

export function MatrixRain({ intensity = 1 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);
  const dropsRef = useRef<number[]>([]);
  const starsRef = useRef<Star[]>([]);
  const timeRef = useRef(0);
  const intensityRef = useRef(intensity);
  intensityRef.current = intensity;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = 13;
    let columns = 0;

    const initStars = (w: number, h: number) => {
      const n = Math.min(420, Math.floor((w * h) / 9000));
      starsRef.current = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.2,
        ph: Math.random() * Math.PI * 2,
        sp: 0.4 + Math.random() * 1.2,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(w / fontSize);
      const prev = dropsRef.current;
      dropsRef.current = Array.from({ length: columns }, (_, i) => prev[i] ?? -Math.random() * h * 0.5);
      initStars(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const inten = intensityRef.current;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      timeRef.current += 0.016;

      const fade = 0.08 + (1 - inten) * 0.06;
      ctx.fillStyle = `rgba(0, 0, 0, ${fade})`;
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px ui-monospace, "Cascadia Code", Consolas, monospace`;

      const t = timeRef.current;
      for (const s of starsRef.current) {
        const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph));
        ctx.fillStyle = `rgba(255, 255, 255, ${0.12 * inten + tw * 0.55 * inten})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      const trailLen = 18;
      for (let i = 0; i < dropsRef.current.length; i++) {
        const x = i * fontSize;
        const head = dropsRef.current[i];

        for (let j = 0; j < trailLen; j++) {
          const y = head - j * fontSize;
          if (y < -fontSize || y > h + fontSize) continue;
          const ch = CHARS[(i * 17 + j * 3 + Math.floor(head)) % CHARS.length];
          const headBright = j === 0;
          const tail = j / trailLen;
          if (headBright) {
            ctx.fillStyle = `rgba(255, 240, 250, ${0.92 * inten})`;
            ctx.shadowColor = "#ff2d95";
            ctx.shadowBlur = 10 * inten;
          } else {
            const a = (0.08 + (1 - tail) * 0.72) * inten;
            const r = Math.floor(236 - tail * 80);
            const g = Math.floor(72 - tail * 40);
            const b = Math.floor(153 - tail * 50);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
            ctx.shadowBlur = 0;
          }
          ctx.globalAlpha = 1;
          ctx.fillText(ch, x, y);
        }
        ctx.shadowBlur = 0;

        dropsRef.current[i] += 0.45 + (i % 7) * 0.04 + Math.random() * 0.08;
        if (dropsRef.current[i] > h + trailLen * fontSize && Math.random() > 0.985) {
          dropsRef.current[i] = -Math.random() * h * 0.4;
        }
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full bg-black"
      aria-hidden
    />
  );
}
