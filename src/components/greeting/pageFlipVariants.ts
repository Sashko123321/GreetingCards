import type { Transition, Variants } from "framer-motion";

export const flipTransition: Transition = {
  duration: 0.58,
  ease: [0.22, 0.9, 0.3, 1],
};

/** custom: 1 = вперед, -1 = назад */
export const bookPageVariants: Variants = {
  enter: (dir: number) => ({
    rotateY: dir > 0 ? -96 : 96,
    x: dir > 0 ? 56 : -56,
    opacity: 0,
    scale: 0.94,
    filter: "blur(4px)",
  }),
  center: {
    rotateY: 0,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    rotateY: dir > 0 ? 96 : -96,
    x: dir > 0 ? -56 : 56,
    opacity: 0,
    scale: 0.94,
    filter: "blur(3px)",
  }),
};
