import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import ComboBox from "../ComboBox.vue";

const options = [
  { value: 1, label: "MySQL ODBC" },
  { value: 2, label: "SQL Server" },
  { value: 3, label: "Access Driver" },
];

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
    expect(wrapper.find('[role="listbox"]').exists()).toBe(true);
    await wrapper.find("input").setValue("server");
    const items = wrapper.findAll('[role="option"]');
    expect(items.length).toBe(1);
    expect(items[0]!.text()).toBe("SQL Server");
  });

  it("emits selection on option mousedown", async () => {
    const wrapper = mount(ComboBox, {
      props: { modelValue: null, options },
      attachTo: document.body,
    });
    await wrapper.find("input").trigger("focus");
    const items = wrapper.findAll('[role="option"]');
    await items[0]!.trigger("mousedown");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([1]);
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
