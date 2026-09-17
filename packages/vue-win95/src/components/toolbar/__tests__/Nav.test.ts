import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Toolbar from "../Toolbar.vue";
import Splitter from "../../splitter/Splitter.vue";
import Button from "../../button/Button.vue";

describe("W95Toolbar", () => {
  it("has toolbar role and contains buttons", () => {
    const wrapper = mount({
      components: { Toolbar, Button },
      template: `
        <Toolbar>
          <Button>New</Button>
          <Button>Open</Button>
        </Toolbar>
      `,
      attachTo: document.body,
    });
    const bar = wrapper.find('[role="toolbar"]');
    expect(bar.exists()).toBe(true);
    expect(wrapper.findAll("button")).toHaveLength(2);
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount({
      components: { Toolbar, Button },
      template: `
        <main>
          <Toolbar>
            <Button>New</Button>
            <Button>Open</Button>
          </Toolbar>
        </main>
      `,
      attachTo: document.body,
    });
    const results = await axe(wrapper.element);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});

describe("W95Splitter", () => {
  it("has separator role with ARIA value", () => {
    const wrapper = mount(Splitter, { props: { min: 100, max: 400 } });
    const sep = wrapper.find('[role="separator"]');
    expect(sep.exists()).toBe(true);
    expect(sep.attributes("aria-valuenow")).toBeDefined();
    expect(sep.attributes("tabindex")).toBe("0");
  });

  it("sets vertical orientation", () => {
    const wrapper = mount(Splitter, { props: { vertical: true } });
    expect(
      wrapper.find('[role="separator"]').attributes("aria-orientation")
    ).toBe("vertical");
  });

  it("emits resize on keyboard", async () => {
    const wrapper = mount(Splitter, { props: { min: 100, max: 400 } });
    await wrapper.find('[role="separator"]').trigger("keydown", {
      key: "ArrowDown",
    });
    expect(wrapper.emitted("resize")).toBeTruthy();
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount(Splitter, { attachTo: document.body });
    const results = await axe(wrapper.element);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});
