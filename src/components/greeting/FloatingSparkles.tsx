import { motion } from "framer-motion";
import type { ThemeId } from "../../theme/greetingCardTheme";

const SPARKLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 47 + 13) % 100}%`,
  top: `${(i * 31 + 7) % 100}%`,
  delay: (i % 5) * 0.35,
  size: 2 + (i % 4),
}));

const tone: Record<
  ThemeId,
  { dot: string; shadow: string }
> = {
  classic: {
    dot: "bg-gradient-to-br from-amber-100 via-amber-400/90 to-amber-200/80",
    shadow: "shadow-[0_0_8px_rgba(201,162,39,0.45)]",
  },
  birthday: {
    dot: "bg-gradient-to-br from-pink-200 via-fuchsia-400/90 to-rose-300",
    shadow: "shadow-[0_0_10px_rgba(236,72,153,0.5)]",
  },
  wedding: {
    dot: "bg-gradient-to-br from-rose-100 via-rose-300/95 to-amber-100",
    shadow: "shadow-[0_0_8px_rgba(225,120,130,0.4)]",
  },
  newyear: {
    dot: "bg-gradient-to-br from-slate-100 via-amber-200/90 to-indigo-200/80",
    shadow: "shadow-[0_0_10px_rgba(250,204,21,0.35)]",
  },
};

type Props = { themeId: ThemeId };

export function FloatingSparkles({ themeId }: Props) {
  const t = tone[themeId];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {SPARKLES.map((s) => (
        <motion.span
          key={s.id}
          className={`absolute rounded-full ${t.dot} ${t.shadow}`}
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.85, 0.35, 0.9, 0],
            scale: [0.4, 1, 0.7, 1.1, 0.3],
            y: [0, -6, 4, -3, 0],
          }}
          transition={{
            duration: 4.2,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
