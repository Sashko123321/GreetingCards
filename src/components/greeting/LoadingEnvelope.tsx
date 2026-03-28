import { motion } from "framer-motion";

export function LoadingEnvelope() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="relative h-40 w-56 perspective-book">
        <motion.div
          className="absolute inset-x-0 bottom-0 h-24 rounded-t-lg bg-gradient-to-b from-parchment to-parchment-dark shadow-book"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55 }}
        />
        <motion.div
          className="absolute inset-x-0 top-0 h-28 origin-bottom rounded-t-lg border border-gold/40 bg-gradient-to-br from-white to-parchment shadow-innerWarm"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: [0, -28, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-14 h-0 w-0 -translate-x-1/2 border-l-[6rem] border-r-[6rem] border-t-[3.5rem] border-l-transparent border-r-transparent border-t-gold/35"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-10 -translate-x-1/2 font-display text-lg text-gold-deep"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          ✉
        </motion.div>
      </div>
      <motion.p
        className="mt-10 font-body text-stone-500"
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Відкриваємо листівку…
      </motion.p>
    </div>
  );
}
