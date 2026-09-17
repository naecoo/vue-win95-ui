import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Window from "../Window.vue";

describe("W95Window", () => {
  it("renders title", () => {
    const wrapper = mount(Window, {
      props: { title: "My Window" },
      slots: { default: "content" },
    });
    expect(wrapper.text()).toContain("My Window");
    expect(wrapper.text()).toContain("content");
  });

  it("has close button with aria-label", () => {
    const wrapper = mount(Window, {
      props: { title: "T" },
      slots: { default: "x" },
    });
    const close = wrapper
      .findAll("button")
      .find((b) => b.attributes("aria-label") === "Close");
    expect(close).toBeTruthy();
  });

  it("emits close", async () => {
    const wrapper = mount(Window, {
      props: { title: "T" },
      slots: { default: "x" },
    });
    const close = wrapper
      .findAll("button")
      .find((b) => b.attributes("aria-label") === "Close")!;
    await close.trigger("click");
    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount(Window, {
      props: { title: "Dialog Title" },
      slots: { default: "Hello" },
      attachTo: document.body,
    });
    const results = await axe(wrapper.element);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});
