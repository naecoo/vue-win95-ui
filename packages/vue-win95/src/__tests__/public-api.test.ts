import { describe, it, expect } from "vitest";
import { createApp, h } from "vue";
import * as lib from "../index";
import Win95Default from "../index";

/**
 * 包的公开入口契约。文档里所有安装示例都写
 * `import Win95 from "vue-win95-ui"`，这条路径必须真的可用。
 */
describe("public entry", () => {
  it("exposes a default export that works as a Vue plugin", () => {
    expect(typeof Win95Default).toBe("object");
    expect(typeof (Win95Default as { install?: unknown }).install).toBe("function");
  });

  it("registers every component under a W95 prefix", () => {
    const app = createApp({ render: () => h("div") });
    app.use(Win95Default as never);
    expect(app.component("W95Button")).toBeTruthy();
    expect(app.component("W95Desktop")).toBeTruthy();
    expect(app.component("W95TaskbarItem")).toBeTruthy();
    expect(app.component("W95Textarea")).toBeTruthy();
    expect(app.component("W95MenuEntry")).toBeTruthy();
    // 不应该再出现 <Button> / <Window> 这种通用名
    expect(app.component("Button")).toBeUndefined();
    expect(app.component("Window")).toBeUndefined();
  });

  it("re-exports the pieces the docs rely on", () => {
    for (const name of [
      "install",
      "W95Button",
      "W95Window",
      "W95Table",
      "useFloating",
      "useDismiss",
      "useControllable",
      "nextZIndex",
      "provideLocale",
      "useLocale",
      "locales",
      "cn",
    ]) {
      expect(lib, name).toHaveProperty(name);
    }
    expect(lib).not.toHaveProperty("useResize");
    expect(lib).not.toHaveProperty("useZIndex");
  });
});
