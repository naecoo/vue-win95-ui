import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import { nextTick } from "vue";
import Icon from "../../icon/Icon.vue";
import Link from "../../link/Link.vue";
import Skeleton from "../../skeleton/Skeleton.vue";
import Popover from "../../popover/Popover.vue";
import { alert, confirm } from "../../message/MessageBox";
import Notification from "../../notification/Notification.vue";

describe("W95Icon", () => {
  it("renders glyph and is decorative by default", () => {
    const wrapper = mount(Icon, { props: { name: "folder" } });
    expect(wrapper.text()).toBeTruthy();
    expect(wrapper.attributes("aria-hidden")).toBe("true");
  });

  it("has accessible name when label provided", () => {
    const wrapper = mount(Icon, {
      props: { name: "help", label: "Help" },
    });
    expect(wrapper.attributes("aria-label")).toBe("Help");
  });
});

describe("W95Link", () => {
  it("renders anchor", () => {
    const wrapper = mount(Link, {
      props: { href: "https://example.com" },
      slots: { default: "Docs" },
    });
    expect(wrapper.element.tagName).toBe("A");
    expect(wrapper.attributes("href")).toBe("https://example.com");
  });

  it("has no a11y violations", async () => {
    const wrapper = mount(Link, {
      props: { href: "#top" },
      slots: { default: "Skip" },
      attachTo: document.body,
    });
    const results = await axe(wrapper.element.parentElement!);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});

describe("W95Skeleton", () => {
  it("exposes busy status", () => {
    const wrapper = mount(Skeleton, { props: { lines: 2 } });
    expect(wrapper.attributes("aria-busy")).toBe("true");
    expect(wrapper.findAll(".animate-pulse")).toHaveLength(2);
  });
});

describe("W95Popover", () => {
  it("renders dialog when open", () => {
    const wrapper = mount(Popover, {
      props: { modelValue: true, title: "Hint" },
      slots: {
        trigger: `<button>Open</button>`,
        default: "Body text",
      },
      attachTo: document.body,
    });
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
    expect(wrapper.text()).toContain("Body text");
    wrapper.unmount();
  });

  it("has no a11y violations when open", async () => {
    const wrapper = mount(Popover, {
      props: { modelValue: true, title: "Hint" },
      slots: { default: "Hello" },
      attachTo: document.body,
    });
    const results = await axe(wrapper.find('[role="dialog"]').element);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});

describe("W95MessageBox", () => {
  it("alert resolves true on OK", async () => {
    const p = alert("Saved!", "Info");
    await nextTick();
    const btn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("OK")
    );
    btn?.click();
    await expect(p).resolves.toBe(true);
    await nextTick();
  });

  it("confirm resolves false on Cancel", async () => {
    const p = confirm("Delete?");
    await nextTick();
    const btn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("Cancel")
    );
    btn?.click();
    await expect(p).resolves.toBe(false);
    await nextTick();
  });
});

describe("W95Notification", () => {
  it("renders typed item with icon", async () => {
    const wrapper = mount(Notification, {
      props: {
        modelValue: [
          { id: 1, title: "Error", message: "Disk full", type: "error", duration: 0 },
        ],
      },
      attachTo: document.body,
    });
    await nextTick();
    expect(document.body.textContent).toContain("Disk full");
    wrapper.unmount();
  });
});
