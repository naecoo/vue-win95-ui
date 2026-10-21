import { describe, it, expect, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { axe } from "vitest-axe";
import Table from "../table/Table.vue";
import Form from "../form/Form.vue";
import FormItem from "../form/FormItem.vue";
import Input from "../input/Input.vue";
import Textarea from "../textarea/Textarea.vue";
import Pagination from "../pagination/Pagination.vue";
import MenuBar from "../menu/MenuBar.vue";
import MenuEntry from "../menu/MenuEntry.vue";
import MenuItem from "../menu/MenuItem.vue";
import { provideLocale } from "../../locale";
import { $, cleanupOverlays } from "../../test-utils/dom";

afterEach(cleanupOverlays);

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "size", label: "Size", align: "right" as const },
];
const rows = [
  { id: 1, name: "alpha", size: 3 },
  { id: 2, name: "beta", size: 9 },
];

describe("W95Table — API depth", () => {
  it("renders custom cells through slots", () => {
    const wrapper = mount(Table, {
      props: { columns, rows },
      slots: {
        "cell-name": `<template #cell-name="{ value }"><b class="cell-name">{{ value }}</b></template>`,
      },
      attachTo: document.body,
    });
    expect(wrapper.findAll(".cell-name")).toHaveLength(2);
    expect(wrapper.find(".cell-name").text()).toBe("alpha");
    wrapper.unmount();
  });

  it("falls back to the generic cell slot", () => {
    const wrapper = mount(Table, {
      props: { columns, rows },
      slots: { cell: `<template #cell="{ value }"><i class="cell">{{ value }}</i></template>` },
      attachTo: document.body,
    });
    expect(wrapper.findAll(".cell")).toHaveLength(4);
    wrapper.unmount();
  });

  it("marks rows as selected for assistive tech", () => {
    const wrapper = mount(Table, {
      props: { columns, rows, selectedKey: 2, interactive: true },
      attachTo: document.body,
    });
    const trs = wrapper.findAll("tbody tr");
    expect(trs[1]!.attributes("aria-selected")).toBe("true");
    expect(trs[0]!.attributes("aria-selected")).toBe("false");
    wrapper.unmount();
  });

  it("shows loading state instead of rows", () => {
    const wrapper = mount(Table, {
      props: { columns, rows, loading: true },
      attachTo: document.body,
    });
    expect(wrapper.text()).toContain("Loading");
    expect(wrapper.find("tbody").findAll("tr")).toHaveLength(1);
    expect(wrapper.attributes("aria-busy")).toBe("true");
    wrapper.unmount();
  });

  it("sorts locally when uncontrolled", async () => {
    const wrapper = mount(Table, { props: { columns, rows }, attachTo: document.body });
    await wrapper.find("thead button").trigger("click");
    expect(wrapper.emitted("sort")?.[0]).toEqual(["name", "asc"]);
    const first = wrapper.findAll("tbody tr")[0]!;
    expect(first.text()).toContain("alpha");
    await wrapper.find("thead button").trigger("click");
    const firstDesc = wrapper.findAll("tbody tr")[0]!;
    expect(firstDesc.text()).toContain("beta");
    wrapper.unmount();
  });

  it("defers to the parent when sortBy is controlled", async () => {
    const wrapper = mount(Table, {
      props: { columns, rows, sortBy: "name", sortDir: "asc" },
      attachTo: document.body,
    });
    await wrapper.find("thead button").trigger("click");
    expect(wrapper.emitted("update:sortDir")?.[0]).toEqual(["desc"]);
    // 父级没更新 → 视图保持原状，不会自说自话
    expect(wrapper.findAll("tbody tr")[0]!.text()).toContain("alpha");
    wrapper.unmount();
  });
});

describe("W95Form / W95FormItem", () => {
  it("wires label, error and aria on the control", async () => {
    const wrapper = mount(
      defineComponent({
        components: { Form, FormItem, Input },
        setup: () => () =>
          h(Form, null, () => [
            h(
              FormItem,
              { label: "Name", error: "Required", required: true, for: "name-field" },
              () => h(Input, { modelValue: "" })
            ),
          ]),
      }),
      { attachTo: document.body }
    );
    await nextTick();
    const input = wrapper.find("input");
    expect(input.attributes("id")).toBe("name-field");
    expect(input.attributes("aria-invalid")).toBe("true");
    expect(input.attributes("aria-describedby")).toBe("name-field-error");
    expect(wrapper.find("#name-field-error").text()).toBe("Required");
    expect(wrapper.find("label").attributes("for")).toBe("name-field");
    wrapper.unmount();
  });

  it("gives textarea the same field wiring", async () => {
    const wrapper = mount(
      defineComponent({
        components: { Form, FormItem, Textarea },
        setup: () => () =>
          h(Form, null, () => [
            h(FormItem, { label: "Notes", hint: "Max 200 chars" }, () =>
              h(Textarea, { modelValue: "hi" })
            ),
          ]),
      }),
      { attachTo: document.body }
    );
    await nextTick();
    const el = wrapper.find("textarea");
    expect(el.attributes("id")).toBeTruthy();
    expect(el.attributes("aria-describedby")).toBe(`${el.attributes("id")}-hint`);
    wrapper.unmount();
  });
});

describe("W95Textarea", () => {
  it("emits input value", async () => {
    const wrapper = mount(Textarea, { props: { modelValue: "" }, attachTo: document.body });
    await wrapper.find("textarea").setValue("hello");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["hello"]);
    wrapper.unmount();
  });
});

describe("W95Pagination — windowing", () => {
  it("does not render a button per page", async () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 50, total: 1000, pageSize: 10, showTotal: true },
      attachTo: document.body,
    });
    const buttons = wrapper.findAll("button");
    expect(buttons.length).toBeLessThan(12);
    expect(wrapper.text()).toContain("1000");
    expect(wrapper.findAll('[aria-current="page"]')[0]!.text()).toBe("50");
    await wrapper.find('[aria-label="Next page"]').trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([51]);
    wrapper.unmount();
  });
});

describe("locale", () => {
  it("renders built-in copy in zh-CN", async () => {
    const wrapper = mount(
      defineComponent({
        components: { Pagination },
        setup() {
          provideLocale("zh-CN");
          return () => h(Pagination, { modelValue: 1, total: 100, pageSize: 10, showTotal: true });
        },
      }),
      { attachTo: document.body }
    );
    expect(wrapper.text()).toContain("共 100 条");
    expect(wrapper.find('[aria-label="下一页"]').exists()).toBe(true);
    wrapper.unmount();
  });
});

describe("W95MenuBar behaviour", () => {
  it("opens one entry at a time and closes on outside pointerdown", async () => {
    const wrapper = mount(
      {
        components: { MenuBar, MenuEntry, MenuItem },
        template: `
          <MenuBar>
            <MenuEntry label="File"><MenuItem>New</MenuItem></MenuEntry>
            <MenuEntry label="Edit"><MenuItem>Undo</MenuItem></MenuEntry>
          </MenuBar>
        `,
        attachTo: document.body,
      },
      { attachTo: document.body }
    );

    const triggers = wrapper.findAll('[role="menuitem"]');
    await triggers[0]!.trigger("click");
    await new Promise((r) => setTimeout(r, 20));
    expect(triggers[0]!.attributes("aria-expanded")).toBe("true");
    expect($('[role="menu"]')).toBeTruthy();

    // 已展开时划过另一个顶层项 → 切换过去
    await triggers[1]!.trigger("pointerenter");
    await new Promise((r) => setTimeout(r, 20));
    expect(triggers[1]!.attributes("aria-expanded")).toBe("true");
    expect(triggers[0]!.attributes("aria-expanded")).toBe("false");

    document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    await new Promise((r) => setTimeout(r, 20));
    expect($('[role="menu"]')).toBeNull();
    wrapper.unmount();
  });

  it("has no a11y violations", async () => {
    const wrapper = mount(
      {
        components: { MenuBar, MenuEntry, MenuItem },
        template: `
          <main><MenuBar>
            <MenuEntry label="File"><MenuItem>New</MenuItem></MenuEntry>
          </MenuBar></main>
        `,
        attachTo: document.body,
      },
      { attachTo: document.body }
    );
    const results = await axe(wrapper.element);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});
