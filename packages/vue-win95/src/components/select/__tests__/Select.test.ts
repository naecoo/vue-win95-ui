import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Select from "../Select.vue";

const options = [
  { value: "1", label: "Incredible" },
  { value: "2", label: "Great" },
  { value: "3", label: "Pretty good" },
];

describe("W95Select", () => {
  it("renders options", () => {
    const wrapper = mount(Select, {
      props: { options, modelValue: "1", label: "Rate" },
    });
    expect(wrapper.findAll("option")).toHaveLength(3);
    expect(wrapper.find("label").text()).toBe("Rate");
  });

  it("emits update:modelValue on change", async () => {
    const wrapper = mount(Select, {
      props: { options, modelValue: "1" },
    });
    await wrapper.find("select").setValue("2");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["2"]);
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount(Select, {
      props: { options, modelValue: "1", label: "Rating", id: "rate" },
      attachTo: document.body,
    });
    const results = await axe(wrapper.element.parentElement!);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });

  it("uses native select element", () => {
    const wrapper = mount(Select, { props: { options } });
    expect(wrapper.find("select").exists()).toBe(true);
  });
});
