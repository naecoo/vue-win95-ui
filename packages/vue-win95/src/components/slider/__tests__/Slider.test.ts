import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Slider from "../Slider.vue";

describe("W95Slider", () => {
  it("renders with label", () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 5, min: 1, max: 11, label: "Volume" },
    });
    expect(wrapper.find("label").text()).toBe("Volume");
    expect((wrapper.find("input").element as HTMLInputElement).value).toBe("5");
  });

  it("emits update:modelValue on input", async () => {
    const wrapper = mount(Slider, { props: { modelValue: 0, min: 0, max: 100 } });
    await wrapper.find("input").setValue("40");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([40]);
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 50, label: "Cowbell", id: "cow" },
      attachTo: document.body,
    });
    const results = await axe(wrapper.element.parentElement!);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });

  it("uses native range input", () => {
    const wrapper = mount(Slider, { props: { modelValue: 0 } });
    expect(wrapper.find("input").attributes("type")).toBe("range");
  });
});
