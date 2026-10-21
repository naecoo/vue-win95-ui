import { describe, it, expect, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import ComboBox from "../ComboBox.vue";
import { $, $$, cleanupOverlays } from "../../../test-utils/dom";

const options = [
  { value: 1, label: "MySQL ODBC" },
  { value: 2, label: "SQL Server" },
  { value: 3, label: "Access Driver" },
];

afterEach(cleanupOverlays);

describe("W95ComboBox", () => {
  it("shows selected label", () => {
    const wrapper = mount(ComboBox, {
      props: { modelValue: 2, options, label: "Driver" },
    });
    const input = wrapper.find("input");
    expect((input.element as HTMLInputElement).value).toBe("SQL Server");
  });

  it("opens listbox on focus and filters on input", async () => {
    const wrapper = mount(ComboBox, {
      props: { modelValue: null, options, label: "Driver" },
      attachTo: document.body,
    });
    await wrapper.find("input").trigger("focus");
    expect($('[role="listbox"]')).toBeTruthy();
    await wrapper.find("input").setValue("server");
    const items = $$('[role="option"]');
    expect(items.length).toBe(1);
    expect(items[0]!.textContent).toContain("SQL Server");
    wrapper.unmount();
  });

  it("emits selection on option click", async () => {
    const wrapper = mount(ComboBox, {
      props: { modelValue: null, options },
      attachTo: document.body,
    });
    await wrapper.find("input").trigger("focus");
    const first = $$('[role="option"]')[0]!;
    first.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([1]);
    wrapper.unmount();
  });

  it("closes the listbox when clicking outside", async () => {
    const wrapper = mount(ComboBox, {
      props: { modelValue: null, options },
      attachTo: document.body,
    });
    await wrapper.find("input").trigger("focus");
    expect($('[role="listbox"]')).toBeTruthy();
    document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    await wrapper.vm.$nextTick();
    expect($('[role="listbox"]')).toBeNull();
    wrapper.unmount();
  });

  it("clears the value when clearable", async () => {
    const wrapper = mount(ComboBox, {
      props: { modelValue: 2, options, clearable: true },
      attachTo: document.body,
    });
    const clear = wrapper.find('button[aria-label="Clear"]');
    expect(clear.exists()).toBe(true);
    await clear.trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([null]);
    wrapper.unmount();
  });

  it("has combobox role and no a11y violations", async () => {
    const wrapper = mount(ComboBox, {
      props: { modelValue: null, options, label: "Driver", id: "drv" },
      attachTo: document.body,
    });
    const input = wrapper.find("input");
    expect(input.attributes("role")).toBe("combobox");
    const results = await axe(wrapper.element.parentElement!);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});
