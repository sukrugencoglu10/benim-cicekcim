import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Açık, premium gül kurusu / mor paleti — koyu ton yok
        brand: {
          DEFAULT: "#a86d8f",
          dark: "#8f5677",
          light: "#c79bb4",
          soft: "#f3e7ee",
        },
        cream: "#faf8f9",
        ink: "#2d2a2e", // başlıklar (siyah değil, koyu gri)
        muted: "#6b6b6b",
        line: "#ece7ea",
        sale: "#c25b78",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(168,109,143,0.18)",
        soft: "0 4px 20px -8px rgba(45,42,46,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
