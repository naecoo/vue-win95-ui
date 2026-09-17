/** @type {import('tailwindcss').Config} */
import preset from "../packages/tailwind-preset/src/index.js";

export default {
  presets: [preset],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
    "../packages/vue-win95/src/**/*.{vue,js,ts}",
  ],
  plugins: [],
};
