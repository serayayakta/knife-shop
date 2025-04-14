import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#92400e",     // burnt orange
          light: "#fcd5b5",       // pale amber
          dark: "#4b2e14"         // dark oak
        }
      }
    }
  },
  plugins: []
};

export default config;
