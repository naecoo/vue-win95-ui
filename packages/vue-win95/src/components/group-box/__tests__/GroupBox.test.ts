import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import GroupBox from "../GroupBox.vue";

describe("W95GroupBox", () => {
  it("renders legend and content", () => {
    const wrapper = mount(GroupBox, {
      props: { legend: "Select one:" },
      slots: { default: "content" },
    });
    expect(wrapper.find("legend").text()).toBe("Select one:");
    expect(wrapper.text()).toContain("content");
  });

  it("uses fieldset element", () => {
    const wrapper = mount(GroupBox, {
      props: { legend: "L" },
      slots: { default: "x" },
    });
    expect(wrapper.element.tagName).toBe("FIELDSET");
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount(GroupBox, {
      props: { legend: "Options" },
      slots: { default: "inner" },
      attachTo: document.body,
    });
    const results = await axe(wrapper.element.parentElement!);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});
