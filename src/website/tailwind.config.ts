import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1B2B4B",
        cream: "#F5F0E8",
        gold: "#C9A84C",
        "gold-dark": "#B8993F",
        charcoal: "#2D2D2D",
      },
      fontFamily: {
        sans: ["var(--font-dmsans)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      letterSpacing: {
        luxe: "0.22em",
      },
      maxWidth: {
        "7xl": "80rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
