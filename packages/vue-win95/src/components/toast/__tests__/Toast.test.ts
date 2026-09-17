import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Toast from "../Toast.vue";

describe("W95Toast", () => {
  it("renders toast messages", async () => {
    const wrapper = mount(Toast, {
      props: {
        modelValue: [
          { id: 1, title: "Saved", message: "Document saved.", duration: 0 },
        ],
      },
      attachTo: document.body,
    });
    expect(document.body.textContent).toContain("Document saved.");
    wrapper.unmount();
  });

  it("dismisses on close click", async () => {
    const wrapper = mount(Toast, {
      props: {
        modelValue: [{ id: 1, title: "Hi", message: "Hello", duration: 0 }],
      },
      attachTo: document.body,
    });
    const btn = document.querySelector('[aria-label="Close notification"]');
    btn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")?.[0]?.[0]).toEqual([]);
    wrapper.unmount();
  });
});
