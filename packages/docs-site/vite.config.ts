import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Markdown from "vite-plugin-md";
import { resolve } from "node:path";

export default defineConfig({
  // relative base so GitHub Pages project sites work
  base: process.env.DOCS_BASE || "./",
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
