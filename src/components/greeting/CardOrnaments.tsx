import { motion } from "framer-motion";

type FlourishProps = { accentClassName?: string };

export function CardCornerFlourishes({ accentClassName = "text-gold/55" }: FlourishProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      <motion.svg
        className={`absolute left-2 top-2 h-16 w-16 ${accentClassName}`}
        viewBox="0 0 64 64"
        fill="none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <path
          d="M8 8h12v4H12v8H8V8zm0 40h8v8h12v4H8V48zm40-40h8v12h-4v8h-4V8zm0 40h8v8h-8v-4h-4v-4z"
          fill="currentColor"
          opacity="0.6"
        />
        <path
          d="M8 8c8 0 8 8 16 8M56 8c-8 0-8 8-16 8M8 56c8 0 8-8 16-8M56 56c-8 0-8-8-16-8"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.45"
        />
      </motion.svg>
      <motion.svg
        className={`absolute right-2 top-2 h-16 w-16 scale-x-[-1] ${accentClassName}`}
        viewBox="0 0 64 64"
        fill="none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <path
          d="M8 8h12v4H12v8H8V8zm0 40h8v8h12v4H8V48zm40-40h8v12h-4v8h-4V8zm0 40h8v8h-8v-4h-4v-4z"
          fill="currentColor"
          opacity="0.6"
        />
        <path
          d="M8 8c8 0 8 8 16 8M56 8c-8 0-8 8-16 8M8 56c8 0 8-8 16-8M56 56c-8 0-8-8-16-8"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.45"
        />
      </motion.svg>
      <motion.svg
        className={`absolute bottom-2 left-2 h-16 w-16 scale-y-[-1] ${accentClassName}`}
        viewBox="0 0 64 64"
        fill="none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        <path
          d="M8 8h12v4H12v8H8V8zm0 40h8v8h12v4H8V48zm40-40h8v12h-4v8h-4V8zm0 40h8v8h-8v-4h-4v-4z"
          fill="currentColor"
          opacity="0.6"
        />
      </motion.svg>
      <motion.svg
        className={`absolute bottom-2 right-2 h-16 w-16 scale-[-1] ${accentClassName}`}
        viewBox="0 0 64 64"
        fill="none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <path
          d="M8 8h12v4H12v8H8V8zm0 40h8v8h12v4H8V48zm40-40h8v12h-4v8h-4V8zm0 40h8v8h-8v-4h-4v-4z"
          fill="currentColor"
          opacity="0.6"
        />
      </motion.svg>
    </div>
  );
}

type DividerProps = { className?: string; viaClassName?: string };

export function GoldFoilDivider({ className = "", viaClassName = "via-gold" }: DividerProps) {
  return (
    <motion.div
      className={`relative h-px w-full overflow-hidden ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${viaClassName} to-transparent`} />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent"
        animate={{ x: ["-100%", "120%"] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}
