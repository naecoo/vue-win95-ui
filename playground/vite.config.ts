import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "vue-win95": resolve(__dirname, "../packages/vue-win95/src/index.ts"),
    },
  },
  server: {
    port: 5173,
  },
});
