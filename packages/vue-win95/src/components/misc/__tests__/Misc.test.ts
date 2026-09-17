import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Accordion from "../../accordion/Accordion.vue";
import AccordionItem from "../../accordion/AccordionItem.vue";
import Breadcrumb from "../../breadcrumb/Breadcrumb.vue";
import Pagination from "../../pagination/Pagination.vue";
import Switch from "../../switch/Switch.vue";
import Avatar from "../../avatar/Avatar.vue";

describe("W95Accordion", () => {
  it("toggles panels", async () => {
    const wrapper = mount({
      components: { Accordion, AccordionItem },
      template: `
        <Accordion v-model="open">
          <AccordionItem value="a" title="Section A">Body A</AccordionItem>
          <AccordionItem value="b" title="Section B">Body B</AccordionItem>
        </Accordion>
      `,
      data: () => ({ open: null }),
      attachTo: document.body,
    });
    const buttons = () => wrapper.findAll("button");
    expect(buttons()[0]!.attributes("aria-expanded")).toBe("false");
    await buttons()[0]!.trigger("click");
    expect(buttons()[0]!.attributes("aria-expanded")).toBe("true");
    expect(wrapper.text()).toContain("Body A");
  });

  it("has no a11y violations", async () => {
    const wrapper = mount({
      components: { Accordion, AccordionItem },
      template: `
        <main>
          <Accordion open-value="a">
            <AccordionItem value="a" title="S">B</AccordionItem>
          </Accordion>
        </main>
      `,
      attachTo: document.body,
    });
    // force open via modelValue prop name
    wrapper.unmount();
    const w2 = mount({
      components: { Accordion, AccordionItem },
      template: `
        <main>
          <Accordion :model-value="'a'">
            <AccordionItem value="a" title="Section">Body</AccordionItem>
          </Accordion>
        </main>
      `,
      attachTo: document.body,
    });
    const results = await axe(w2.element);
    expect(results.violations).toEqual([]);
    w2.unmount();
  });
});

describe("W95Breadcrumb", () => {
  it("renders trail with current page", () => {
    const wrapper = mount(Breadcrumb, {
      props: {
        items: [
          { label: "Desktop" },
          { label: "My Computer" },
          { label: "C:" },
        ],
      },
    });
    expect(wrapper.text()).toContain("C:");
    expect(wrapper.find('[aria-current="page"]').text()).toBe("C:");
  });

  it("has no a11y violations", async () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: [{ label: "Home" }, { label: "Here" }] },
      attachTo: document.body,
    });
    const results = await axe(wrapper.element.parentElement!);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});

describe("W95Pagination", () => {
  it("renders pages and emits change", async () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, total: 30, pageSize: 10 },
    });
    expect(wrapper.findAll("button")).toHaveLength(5); // prev + 3 + next
    const page2 = wrapper.findAll("button")[2]!;
    await page2.trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([2]);
  });

  it("disables prev on first page", () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, total: 30, pageSize: 10 },
    });
    const prev = wrapper.findAll("button")[0]!;
    expect(prev.attributes("disabled")).toBeDefined();
  });

  it("has no a11y violations", async () => {
    const wrapper = mount(Pagination, {
      props: { modelValue: 1, total: 30, pageSize: 10 },
      attachTo: document.body,
    });
    const results = await axe(wrapper.element.parentElement!);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});

describe("W95Switch", () => {
  it("has switch role and toggles", async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false, label: "Enabled" },
    });
    const sw = wrapper.find('[role="switch"]');
    expect(sw.attributes("aria-checked")).toBe("false");
    await sw.trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
  });

  it("has no a11y violations", async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: true, label: "Sound on" },
      attachTo: document.body,
    });
    const results = await axe(wrapper.element.parentElement!);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});

describe("W95Avatar", () => {
  it("renders initials", () => {
    const wrapper = mount(Avatar, { props: { initials: "W9" } });
    expect(wrapper.text()).toBe("W9");
  });

  it("renders image when src provided", () => {
    const wrapper = mount(Avatar, {
      props: { src: "x.png", alt: "User", initials: "AB" },
    });
    expect(wrapper.find("img").attributes("src")).toBe("x.png");
  });
});
