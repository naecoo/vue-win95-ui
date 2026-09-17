import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Button from "../Input.vue";

describe("W95Input", () => {
  it("renders label and input", () => {
    const wrapper = mount(Button, {
      props: { label: "Name", modelValue: "Hello" },
    });
    expect(wrapper.find("label").text()).toBe("Name");
    expect((wrapper.find("input").element as HTMLInputElement).value).toBe("Hello");
  });

  it("emits update:modelValue on input", async () => {
    const wrapper = mount(Button, { props: { modelValue: "" } });
    await wrapper.find("input").setValue("world");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["world"]);
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount(Button, {
      props: { label: "Occupation", modelValue: "" },
      attachTo: document.body,
    });
    const results = await axe(wrapper.element.parentElement!);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });

  it("links label via for/id", () => {
    const wrapper = mount(Button, { props: { label: "Name", id: "my-input" } });
    expect(wrapper.find("label").attributes("for")).toBe("my-input");
    expect(wrapper.find("input").attributes("id")).toBe("my-input");
  });
});
