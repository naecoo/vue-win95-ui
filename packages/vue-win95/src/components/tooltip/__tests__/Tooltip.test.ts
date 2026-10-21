import { describe, it, expect, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Tooltip from "../Tooltip.vue";
import Button from "../../button/Button.vue";
import { $, cleanupOverlays } from "../../../test-utils/dom";

afterEach(cleanupOverlays);

describe("W95Tooltip", () => {
  it("shows tooltip on mouseenter", async () => {
    const wrapper = mount(Tooltip, {
      props: { content: "Save file", openDelay: 0 },
      slots: { default: "<button>Save</button>" },
      attachTo: document.body,
    });
    expect($('[role="tooltip"]')).toBeNull();
    await wrapper.trigger("mouseenter");
    await new Promise((r) => setTimeout(r, 30));
    await wrapper.vm.$nextTick();
    const tip = $('[role="tooltip"]');
    expect(tip).toBeTruthy();
    expect(tip?.textContent).toContain("Save file");
    wrapper.unmount();
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount(
      {
        components: { Tooltip, Button },
        template: `
          <main>
            <Tooltip content="Help text" :open-delay="0">
              <Button>OK</Button>
            </Tooltip>
          </main>
        `,
        attachTo: document.body,
      }
    );
    const results = await axe(wrapper.element);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});
