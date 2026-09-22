import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Markdown from "vite-plugin-md";
import { resolve } from "node:path";

export default defineConfig({
  // GitHub Pages project site lives under /vue-win95-ui/
  // Local dev uses the same base so asset URLs always resolve.
  base: process.env.DOCS_BASE || "/vue-win95-ui/",
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/, /\.mdx$/],
    }),
    Markdown({
      include: [/\.md$/, /\.mdx$/],
      wrapperClasses: "w95-md",
    }),
  ],
  resolve: {
    alias: {
      "vue-win95": resolve(__dirname, "../vue-win95/src/index.ts"),
    },
  },
  server: { port: 5174 },
});
