import { describe, it, expect } from "vitest";
import * as Win95 from "../index";
// 文档目录是手写的，这里把它当成数据做一致性校验：
// 文档里写了的 prop 必须真的存在，库里导出的组件必须都有文档。
import { docs } from "../../../docs-site/src/components/component-docs";

const lib = Win95 as unknown as Record<string, { props?: Record<string, unknown> }>;

/** 组件内部实现，不面向用户 */
const internal = new Set([
  "W95TabList",
  "W95TabPanel",
  "W95StatusBarField",
  "W95ResizablePanel",
]);

const componentExports = Object.keys(lib).filter(
  (name) => /^W95[A-Z]/.test(name) && typeof lib[name] === "object" && lib[name]
);

describe("docs ↔ library consistency", () => {
  it("every documented component exists in the library", () => {
    const missing = docs.map((d) => d.name).filter((name) => !(name in lib));
    expect(missing).toEqual([]);
  });

  it("every public component is documented", () => {
    const documented = new Set(docs.map((d) => d.name));
    const undocumented = componentExports.filter(
      (name) => !documented.has(name) && !internal.has(name)
    );
    expect(undocumented).toEqual([]);
  });

  it("documented props exist on the component", () => {
    const problems: string[] = [];
    for (const doc of docs) {
      const comp = lib[doc.name];
      if (!comp?.props) continue;
      const actual = Object.keys(comp.props);
      for (const prop of doc.props) {
        if (!actual.includes(prop.name)) {
          problems.push(`${doc.name}.${prop.name} (actual: ${actual.join(", ")})`);
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it("component props that matter are documented", () => {
    const problems: string[] = [];
    for (const doc of docs) {
      if (internal.has(doc.name)) continue;
      const comp = lib[doc.name];
      if (!comp?.props) continue;
      const documented = new Set(doc.props.map((p) => p.name));
      for (const prop of Object.keys(comp.props)) {
        if (prop === "class" || prop === "id") continue;
        if (!documented.has(prop)) problems.push(`${doc.name}.${prop}`);
      }
    }
    expect(problems).toEqual([]);
  });
});
