import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Switch from "../../switch/Switch.vue";
import Avatar from "../../avatar/Avatar.vue";
import Breadcrumb from "../../breadcrumb/Breadcrumb.vue";
import Pagination from "../../pagination/Pagination.vue";
import StatusBar from "../../status-bar/StatusBar.vue";
import StatusBarField from "../../status-bar/StatusBarField.vue";
import Divider from "../../divider/Divider.vue";
import Upload from "../../upload/Upload.vue";
import Icon from "../../icon/Icon.vue";
import Link from "../../link/Link.vue";
import Skeleton from "../../skeleton/Skeleton.vue";
import Popover from "../../popover/Popover.vue";
import MenuSubmenu from "../../menu/MenuSubmenu.vue";
import MenuItem from "../../menu/MenuItem.vue";

async function noViolations(el: HTMLElement) {
  const results = await axe(el);
  expect(results.violations).toEqual([]);
}

describe("Coverage — remaining components", () => {
  it("Switch toggles and is accessible", async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false, label: "Sound" },
      attachTo: document.body,
    });
    expect(wrapper.find('[role="switch"]').attributes("aria-checked")).toBe("false");
    await wrapper.find('[role="switch"]').trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
    await noViolations(wrapper.element.parentElement!);
    wrapper.unmount();
  });

  it("Avatar sizes and image", () => {
    const w1 = mount(Avatar, { props: { initials: "AB", size: "lg" } });
    expect(w1.text()).toBe("AB");
    const w2 = mount(Avatar, { props: { src: "x.png", alt: "User" } });
    expect(w2.find("img").attributes("alt")).toBe("User");
  });

  it("Breadcrumb current page + a11y", async () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: [{ label: "A" }, { label: "B" }] },
      attachTo: document.body,
    });
    expect(wrapper.find('[aria-current="page"]').text()).toBe("B");
    await noViolations(wrapper.element.parentElement!);
    wrapper.unmount();
  });

  it("Pagination pages + a11y", async () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 2, total: 40, pageSize: 10 },
      attachTo: document.body,
    });
    expect(wrapper.findAll("button").length).toBeGreaterThan(3);
    await noViolations(wrapper.element.parentElement!);
    wrapper.unmount();
  });

  it("StatusBar + Divider roles", async () => {
    const s = mount({
      components: { StatusBar, StatusBarField },
      template: `<main><StatusBar><StatusBarField>OK</StatusBarField></StatusBar></main>`,
      attachTo: document.body,
    });
    await noViolations(s.element);
    s.unmount();
    const d = mount(Divider, { attachTo: document.body });
    await noViolations(d.element);
    d.unmount();
  });

  it("Upload lists selected names", async () => {
    const wrapper = mount(Upload, {
      props: { modelValue: [{ name: "a.txt", size: 3, file: new File(["x"], "a.txt") }] },
      attachTo: document.body,
    });
    expect(wrapper.text()).toContain("a.txt");
  });

  it("Icon label / decorative", () => {
    const dec = mount(Icon, { props: { name: "ok" } });
    expect(dec.attributes("aria-hidden")).toBe("true");
    const lab = mount(Icon, { props: { name: "ok", label: "Done" } });
    expect(lab.attributes("role")).toBe("img");
  });

  it("Link disabled state", () => {
    const w = mount(Link, {
      props: { disabled: true, href: "#" },
      slots: { default: "x" },
    });
    expect(w.attributes("aria-disabled")).toBe("true");
  });

  it("Skeleton aria-busy", () => {
    const w = mount(Skeleton, { props: { lines: 3 } });
    expect(w.attributes("aria-busy")).toBe("true");
    expect(w.findAll(".animate-pulse")).toHaveLength(3);
  });

  it("Popover close button works", async () => {
    const wrapper = mount(Popover, {
      props: { modelValue: true, title: "T" },
      slots: { default: "body" },
      attachTo: document.body,
    });
    const btn = wrapper.find('button[aria-label="Close"]');
    await btn.trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([false]);
    wrapper.unmount();
  });

  it("MenuSubmenu aria-expanded toggles", async () => {
    const wrapper = mount(
      {
        components: { MenuSubmenu, MenuItem },
        template: `<MenuSubmenu label="File"><MenuItem>A</MenuItem></MenuSubmenu>`,
        attachTo: document.body,
      }
    );
    const btn = wrapper.find("button");
    expect(btn.attributes("aria-expanded")).toBe("false");
    await btn.trigger("click");
    expect(btn.attributes("aria-expanded")).toBe("true");
  });
});
