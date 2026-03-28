import { motion } from "framer-motion";

/** Піксельне серце поверх дощу — як у референсних кадрах. */
export function PixelHeart({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <motion.svg
        width="120"
        height="110"
        viewBox="0 0 32 28"
        className="drop-shadow-[0_0_18px_rgba(255,20,147,0.85)]"
        aria-hidden
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          fill="#ff4d9d"
          d="M16 26 C4 18 2 12 2 8 C2 4 5 2 9 2 C12 2 14 4 16 7 C18 4 20 2 23 2 C27 2 30 4 30 8 C30 12 28 18 16 26 Z"
          style={{ imageRendering: "pixelated" }}
        />
      </motion.svg>
    </motion.div>
  );
}
