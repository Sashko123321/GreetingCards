import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { normalizeTheme, type ThemeId } from "../../theme/greetingCardTheme";

const TEXTURE_PATH = `${import.meta.env.BASE_URL}GreetingCardsExamplesImages/texture.jpg`;
const VIGNETTE_PATH = `${import.meta.env.BASE_URL}GreetingCardsExamplesImages/vignette.png`;

type Props = {
  theme: string;
};

function SnowLayer({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 36 }, (_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/70"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 23) % 100}%`,
          }}
          animate={{ y: ["-10vh", "110vh"], opacity: [0.2, 0.9, 0.2] }}
          transition={{
            duration: 7 + (i % 5),
            delay: (i % 8) * 0.4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export function AnimatedBackdrop({ theme }: Props) {
  const id: ThemeId = normalizeTheme(theme);
  const [textureOk, setTextureOk] = useState(false);
  const [vignetteOk, setVignetteOk] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setTextureOk(true);
    img.onerror = () => setTextureOk(false);
    img.src = TEXTURE_PATH;
  }, []);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setVignetteOk(true);
    img.onerror = () => setVignetteOk(false);
    img.src = VIGNETTE_PATH;
  }, []);

  const gradientClass: Record<ThemeId, string> = {
    classic:
      "from-[#fdfbf7] via-[#f6efe4] to-[#ebe0d4]",
    birthday:
      "from-[#fff5fb] via-[#ffe4f3] to-[#fff7ed]",
    wedding:
      "from-[#faf7f5] via-[#f5ebe8] to-[#efe8e4]",
    newyear:
      "from-[#020617] via-[#0f172a] to-[#020617]",
  };

  const ambientStyle: Record<ThemeId, string> = {
    classic:
      "radial-gradient(ellipse 80% 50% at 20% 30%, rgba(255,220,180,0.35), transparent 55%), radial-gradient(ellipse 70% 45% at 80% 70%, rgba(255,200,210,0.25), transparent 50%)",
    birthday:
      "radial-gradient(ellipse 75% 55% at 30% 25%, rgba(251,113,133,0.28), transparent 55%), radial-gradient(ellipse 65% 50% at 75% 70%, rgba(250,204,21,0.12), transparent 50%)",
    wedding:
      "radial-gradient(ellipse 80% 50% at 25% 30%, rgba(254,205,211,0.35), transparent 55%), radial-gradient(ellipse 70% 45% at 78% 65%, rgba(214,211,209,0.2), transparent 50%)",
    newyear:
      "radial-gradient(ellipse 70% 45% at 50% 20%, rgba(59,130,246,0.18), transparent 55%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(250,204,21,0.08), transparent 50%)",
  };

  const orb1: Record<ThemeId, string> = {
    classic: "bg-amber-200/25",
    birthday: "bg-pink-300/30",
    wedding: "bg-rose-200/25",
    newyear: "bg-blue-500/15",
  };
  const orb2: Record<ThemeId, string> = {
    classic: "bg-rose-200/20",
    birthday: "bg-fuchsia-300/25",
    wedding: "bg-stone-300/20",
    newyear: "bg-indigo-500/20",
  };
  const orb3: Record<ThemeId, string> = {
    classic: "bg-gold/20",
    birthday: "bg-amber-300/25",
    wedding: "bg-amber-200/15",
    newyear: "bg-amber-400/10",
  };

  const vignetteOpacity = id === "newyear" ? "opacity-[0.55]" : "opacity-[0.35]";

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass[id]}`} />
      <motion.div
        className="absolute inset-0 mix-blend-soft-light"
        animate={{ opacity: id === "newyear" ? [0.08, 0.14, 0.08] : [0.12, 0.22, 0.12] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: ambientStyle[id] }}
      />

      {textureOk && id !== "newyear" && (
        <motion.div
          className="absolute inset-0 opacity-[0.14] mix-blend-multiply"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.14 }}
          transition={{ duration: 1.2 }}
          style={{
            backgroundImage: `url(${TEXTURE_PATH})`,
            backgroundSize: "cover",
          }}
        />
      )}

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
        }}
      />

      <SnowLayer visible={id === "newyear"} />

      <motion.div
        className={`absolute -left-40 top-1/4 h-96 w-96 rounded-full blur-3xl ${orb1[id]}`}
        animate={{ x: [0, 40, 0], y: [0, 24, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute -right-32 bottom-1/4 h-[28rem] w-[28rem] rounded-full blur-3xl ${orb2[id]}`}
        animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full blur-[80px] ${orb3[id]}`}
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {vignetteOk && (
        <div
          className={`absolute inset-0 mix-blend-multiply ${vignetteOpacity}`}
          style={{
            backgroundImage: `url(${VIGNETTE_PATH})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <div
        className={`absolute inset-0 ${
          id === "newyear"
            ? "bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]"
            : "bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(45,32,18,0.12)_100%)]"
        }`}
      />
    </div>
  );
}
