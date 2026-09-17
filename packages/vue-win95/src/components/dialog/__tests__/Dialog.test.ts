import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Dialog from "../Dialog.vue";

describe("W95Dialog", () => {
  it("renders when modelValue is true", () => {
    const wrapper = mount(Dialog, {
      props: { modelValue: true, title: "Confirm" },
      slots: { default: "Are you sure?" },
      attachTo: document.body,
    });
    expect(document.body.textContent).toContain("Are you sure?");
    wrapper.unmount();
  });

  it("does not render when modelValue is false", () => {
    mount(Dialog, {
      props: { modelValue: false, title: "Confirm" },
      slots: { default: "hidden" },
      attachTo: document.body,
    });
    expect(document.body.textContent).not.toContain("hidden");
  });

  it("has alertdialog role and aria-modal", () => {
    const wrapper = mount(Dialog, {
      props: { modelValue: true, title: "T" },
      slots: { default: "body" },
      attachTo: document.body,
    });
    const dialog = document.querySelector('[role="alertdialog"]');
    expect(dialog).toBeTruthy();
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
    wrapper.unmount();
  });

  it("has no accessibility violations when open", async () => {
    const wrapper = mount(Dialog, {
      props: { modelValue: true, title: "Warning" },
      slots: { default: "Delete this file?" },
      attachTo: document.body,
    });
    const dialog = document.querySelector('[role="alertdialog"]')!;
    const results = await axe(dialog.parentElement!);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });

  it("emits update:modelValue false on confirm", async () => {
    const wrapper = mount(Dialog, {
      props: { modelValue: true, title: "T" },
      slots: { default: "x" },
      attachTo: document.body,
    });
    const buttons = document.querySelectorAll("button");
    const ok = Array.from(buttons).find((b) => b.textContent?.includes("OK"));
    ok?.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([false]);
    wrapper.unmount();
  });
});
