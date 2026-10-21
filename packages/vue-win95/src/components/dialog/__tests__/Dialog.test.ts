import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import { nextTick } from "vue";
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

  it("has dialog role, aria-modal and an accessible name", () => {
    const wrapper = mount(Dialog, {
      props: { modelValue: true, title: "T" },
      slots: { default: "body" },
      attachTo: document.body,
    });
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
    const labelledBy = dialog?.getAttribute("aria-labelledby");
    expect(labelledBy).toBeTruthy();
    expect(document.getElementById(labelledBy!)?.textContent?.trim()).toBe("T");
    wrapper.unmount();
  });

  it("supports alertdialog for confirmation prompts", () => {
    const wrapper = mount(Dialog, {
      props: { modelValue: true, title: "T", role: "alertdialog" },
      slots: { default: "body" },
      attachTo: document.body,
    });
    expect(document.querySelector('[role="alertdialog"]')).toBeTruthy();
    wrapper.unmount();
  });

  it("has no accessibility violations when open", async () => {
    const wrapper = mount(Dialog, {
      props: { modelValue: true, title: "Warning" },
      slots: { default: "Delete this file?" },
      attachTo: document.body,
    });
    const dialog = document.querySelector('[role="dialog"]')!;
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
    const ok = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("OK")
    );
    ok?.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([false]);
    expect(wrapper.emitted("confirm")).toBeTruthy();
    wrapper.unmount();
  });

  it("closes on Escape", async () => {
    const wrapper = mount(Dialog, {
      props: { modelValue: true, title: "T" },
      slots: { default: "x" },
      attachTo: document.body,
    });
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    await nextTick();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([false]);
    wrapper.unmount();
  });

  it("restores body scroll lock when unmounted while open", async () => {
    const wrapper = mount(Dialog, {
      props: { modelValue: true, title: "T" },
      slots: { default: "x" },
      attachTo: document.body,
    });
    await nextTick();
    expect(document.body.style.overflow).toBe("hidden");
    wrapper.unmount();
    expect(document.body.style.overflow).toBe("");
  });
});
