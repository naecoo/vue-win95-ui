import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Tooltip from "../Tooltip.vue";
import Button from "../../button/Button.vue";

describe("W95Tooltip", () => {
  it("shows tooltip on mouseenter", async () => {
    const wrapper = mount(Tooltip, {
      props: { content: "Save file", openDelay: 0 },
      slots: { default: "<button>Save</button>" },
      attachTo: document.body,
    });
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
    await wrapper.trigger("mouseenter");
    await new Promise((r) => setTimeout(r, 20));
    await wrapper.vm.$nextTick();
    const tip = wrapper.find('[role="tooltip"]');
    expect(tip.exists()).toBe(true);
    expect(tip.text()).toContain("Save file");
    wrapper.unmount();
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount({
      components: { Tooltip, Button },
      template: `
        <main>
          <Tooltip content="Help text" :open-delay="0">
            <Button>OK</Button>
          </Tooltip>
        </main>
      `,
      attachTo: document.body,
    });
    const results = await axe(wrapper.element);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});
