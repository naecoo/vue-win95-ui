import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Button from "../Button.vue";

describe("W95Button", () => {
  it("renders slot content", () => {
    const wrapper = mount(Button, {
      slots: { default: "Click me" },
    });
    expect(wrapper.text()).toBe("Click me");
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount(Button, {
      slots: { default: "OK" },
      attachTo: document.body,
    });
    const results = await axe(wrapper.element.parentElement!);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });

  it("emits click when enabled", async () => {
    const wrapper = mount(Button, { slots: { default: "OK" } });
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("applies default class", () => {
    const wrapper = mount(Button, {
      props: { default: true },
      slots: { default: "OK" },
    });
    expect(wrapper.classes().join(" ")).toContain("shadow-w95-default-btn");
  });

  it("uses semantic button element", () => {
    const wrapper = mount(Button, { slots: { default: "OK" } });
    expect(wrapper.element.tagName).toBe("BUTTON");
  });
});
