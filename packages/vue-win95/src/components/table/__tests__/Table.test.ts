import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Table from "../Table.vue";

const columns = [
  { key: "name", label: "Name" },
  { key: "version", label: "Version" },
];
const rows = [
  { id: 1, name: "MySQL ODBC", version: "3.51" },
  { id: 2, name: "SQL Server", version: "3.70" },
];

describe("W95Table", () => {
  it("renders columns and rows", () => {
    const wrapper = mount(Table, { props: { columns, rows } });
    expect(wrapper.findAll("th")).toHaveLength(2);
    expect(wrapper.findAll("tbody tr")).toHaveLength(2);
    expect(wrapper.text()).toContain("SQL Server");
  });

  it("emits select on row click", async () => {
    const wrapper = mount(Table, { props: { columns, rows } });
    await wrapper.findAll("tbody tr")[1]!.trigger("click");
    expect(wrapper.emitted("update:selectedKey")?.[0]).toEqual([2]);
  });

  it("marks selected row", async () => {
    const wrapper = mount(Table, {
      props: { columns, rows, selectedKey: 1 },
    });
    const tr = wrapper.findAll("tbody tr")[0]!;
    expect(tr.classes().join(" ")).toContain("bg-w95-blue");
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount(Table, {
      props: { columns, rows },
      attachTo: document.body,
    });
    const results = await axe(wrapper.element.parentElement!);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});
