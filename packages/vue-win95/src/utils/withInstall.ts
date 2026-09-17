import type { App, Component } from "vue";

export function withInstall<T extends Component>(comp: T) {
  const c = comp as T & { install: (app: App) => void };
  c.install = (app: App) => {
    const name =
      (comp as { name?: string }).name ||
      (comp as { __name?: string }).__name ||
      "Component";
    app.component(name, comp);
  };
  return c;
}
