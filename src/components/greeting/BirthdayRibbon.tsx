import { motion } from "framer-motion";

/** Легкі «конфеті» / стрічки — як на святкових листівках-референсах. */
export function BirthdayRibbon() {
  const pieces = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: `${(i * 73) % 100}%`,
    delay: (i % 7) * 0.12,
    dur: 5 + (i % 4),
    rot: (i * 47) % 360,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 h-3 w-3 rounded-sm bg-gradient-to-br from-amber-200 via-rose-200 to-gold/60 opacity-80 shadow-sm"
          style={{ left: p.x }}
          initial={{ y: -24, rotate: p.rot, opacity: 0 }}
          animate={{ y: ["0%", "108%"], rotate: p.rot + 180, opacity: [0, 0.9, 0.9, 0] }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
