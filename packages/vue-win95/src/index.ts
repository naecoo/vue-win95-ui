import "./styles.css";

export * from "./components";
export * from "./composables";
export * from "./locale";
export { cn } from "./utils/cn";

/**
 * 默认导出即 Vue 插件：`import Win95 from "vue-win95-ui"; app.use(Win95)`。
 * `export *` 不会带上 components 的 default，必须显式转发，否则文档里的
 * 主要用法会拿到 undefined。
 */
export { default } from "./components";
