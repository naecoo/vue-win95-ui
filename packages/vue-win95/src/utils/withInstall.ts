import type { App, Component } from "vue";

/**
 * 全局注册。必须显式给出注册名：
 * <script setup> 的 __name 是文件名，兜底会注册出 <Button> / <Window> 这类
 * 通用名，与文档承诺的 W95Button 不一致，还会和其他库撞名。
 */
export function withInstall<T extends Component>(comp: T, name: string) {
  const c = comp as T & { install: (app: App) => void };
  c.install = (app: App) => app.component(name, comp);
  return c;
}
