import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B3B3B",     // Iron Gray
        accent: "#B45309",      // Rust Brown
        neutral: "#F5F1EB",     // Ash Beige
        textBase: "#1C1C1C",    // Charcoal Black
        textMuted: "#6B625A",   // Oak Gray
      },
    },
  },
  plugins: [],
};

export default config;
