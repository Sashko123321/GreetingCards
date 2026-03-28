import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Set VITE_BASE=/repo-name/ for GitHub Pages project site
// const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  plugins: [react()],
  base: "/GreetingCards",
});
