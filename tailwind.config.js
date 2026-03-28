/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: "#faf6ef",
          dark: "#f0e8dc",
        },
        gold: {
          soft: "#e8d5a8",
          DEFAULT: "#c9a227",
          deep: "#8b6914",
        },
        rose: {
          mist: "#fdeef2",
          DEFAULT: "#e8a0a8",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        body: ["'Source Sans 3'", "system-ui", "sans-serif"],
        /** Піксельний шрифт як у референсі (Matrix + відлік) */
        pixel: ['"Press Start 2P"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        book: "0 25px 50px -12px rgba(44, 36, 22, 0.35)",
        innerWarm: "inset 0 2px 12px rgba(255, 248, 235, 0.6)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        floaty: "floaty 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
