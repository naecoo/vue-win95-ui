import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Checkbox from "../Checkbox.vue";

describe("W95Checkbox", () => {
  it("renders label", () => {
    const wrapper = mount(Checkbox, {
      props: { label: "This is a checkbox" },
    });
    expect(wrapper.find("label").text()).toBe("This is a checkbox");
  });

  it("emits update:modelValue on change", async () => {
    const wrapper = mount(Checkbox, { props: { modelValue: false, label: "A" } });
    await wrapper.find("input").setValue(true);
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount(Checkbox, {
      props: { label: "Accept terms" },
      attachTo: document.body,
    });
    const results = await axe(wrapper.element.parentElement!);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });

  it("uses native checkbox input", () => {
    const wrapper = mount(Checkbox, { props: { label: "A" } });
    expect(wrapper.find("input").attributes("type")).toBe("checkbox");
  });

  it("links label via for/id", () => {
    const wrapper = mount(Checkbox, { props: { label: "A", id: "cb1" } });
    expect(wrapper.find("label").attributes("for")).toBe("cb1");
  });
});
