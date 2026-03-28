import { motion } from "framer-motion";

type Props = {
  total: number;
  active: number;
  onSelect?: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
};

export function ProgressDots({
  total,
  active,
  onSelect,
  activeColor = "rgba(201, 162, 39, 0.95)",
  inactiveColor = "rgba(214, 211, 209, 0.85)",
}: Props) {
  const interactive = typeof onSelect === "function";

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <motion.button
          key={i}
          type="button"
          aria-label={`Сторінка ${i + 1}`}
          className={`relative h-2.5 rounded-full ${interactive ? "cursor-pointer" : "cursor-default"}`}
          disabled={!interactive}
          onClick={() => onSelect?.(i)}
          animate={{
            width: i === active ? 28 : 10,
            backgroundColor: i === active ? activeColor : inactiveColor,
          }}
          whileHover={interactive ? { scale: 1.08 } : undefined}
          whileTap={interactive ? { scale: 0.94 } : undefined}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
        >
          {i === active && (
            <motion.span
              className="absolute inset-0 rounded-full bg-white/35"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}
