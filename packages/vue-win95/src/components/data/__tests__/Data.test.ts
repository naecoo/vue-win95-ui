import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import SpinButton from "../../spin-button/SpinButton.vue";
import DatePicker from "../../date-picker/DatePicker.vue";

describe("W95SpinButton", () => {
  it("has spinbutton role with aria values", () => {
    const wrapper = mount(SpinButton, {
      props: { modelValue: 5, min: 0, max: 10, label: "Count" },
    });
    const input = wrapper.find('[role="spinbutton"]');
    expect(input.exists()).toBe(true);
    expect(input.attributes("aria-valuenow")).toBe("5");
    expect(input.attributes("aria-valuemin")).toBe("0");
  });

  it("increments and decrements", async () => {
    const wrapper = mount(SpinButton, {
      props: { modelValue: 5, min: 0, max: 10 },
    });
    const buttons = wrapper.findAll("button");
    await buttons[0]!.trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([6]);
    await buttons[1]!.trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[1]).toEqual([4]);
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount(SpinButton, {
      props: { modelValue: 5, min: 0, max: 10, label: "Count" },
      attachTo: document.body,
    });
    const results = await axe(wrapper.element.parentElement!);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});

describe("W95DatePicker", () => {
  it("renders selected value", () => {
    const wrapper = mount(DatePicker, {
      props: { modelValue: "2024-06-15", label: "Date" },
    });
    expect((wrapper.find("input").element as HTMLInputElement).value).toBe(
      "2024-06-15"
    );
  });

  it("opens calendar dialog", async () => {
    const wrapper = mount(DatePicker, {
      props: { modelValue: null },
      attachTo: document.body,
    });
    await wrapper.find("button").trigger("click");
    expect(document.querySelector('[role="dialog"]')).toBeTruthy();
    wrapper.unmount();
  });

  it("emits formatted date on day click", async () => {
    const wrapper = mount(DatePicker, {
      props: { modelValue: null },
      attachTo: document.body,
    });
    await wrapper.find("button").trigger("click");
    const days = document.querySelectorAll(
      '[role="dialog"] button:not([aria-label])'
    );
    // click a day that has number text
    const day = Array.from(days).find((b) => b.textContent?.trim() === "10");
    day?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await wrapper.vm.$nextTick();
    const emitted = wrapper.emitted("update:modelValue")?.[0]?.[0];
    expect(String(emitted)).toMatch(/^\d{4}-\d{2}-10$/);
    wrapper.unmount();
  });
});
