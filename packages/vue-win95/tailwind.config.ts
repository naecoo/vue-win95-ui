import type { Config } from "tailwindcss";
import preset from "@win95/tailwind-preset";

const config: Config = {
  presets: [preset],
  content: [
    "./src/**/*.{vue,ts,tsx,js,jsx}",
    "./stories/**/*.{vue,ts,mdx}",
  ],
  plugins: [],
};

export default config;
