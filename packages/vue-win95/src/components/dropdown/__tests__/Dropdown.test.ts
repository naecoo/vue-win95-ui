import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Dropdown from "../Dropdown.vue";
import MenuItem from "../../menu/MenuItem.vue";

describe("W95Dropdown", () => {
  it("toggles menu on click", async () => {
    const wrapper = mount({
      components: { Dropdown, MenuItem },
      template: `
        <main>
          <Dropdown v-model="open" label="File">
            <MenuItem>New</MenuItem>
            <MenuItem>Open</MenuItem>
          </Dropdown>
        </main>
      `,
      data: () => ({ open: false }),
      attachTo: document.body,
    });
    expect(wrapper.find('[role="menu"]').exists()).toBe(false);
    await wrapper.find("button").trigger("click");
    expect(wrapper.find('[role="menu"]').exists()).toBe(true);
    expect(wrapper.findAll('[role="menuitem"]')).toHaveLength(2);
    wrapper.unmount();
  });

  it("has aria-haspopup on trigger", () => {
    const wrapper = mount(Dropdown, {
      props: { modelValue: false, label: "File" },
      attachTo: document.body,
    });
    const btn = wrapper.find("button");
    expect(btn.attributes("aria-haspopup")).toBe("menu");
    expect(btn.attributes("aria-expanded")).toBe("false");
  });

  it("has no accessibility violations when open", async () => {
    const wrapper = mount({
      components: { Dropdown, MenuItem },
      template: `
        <main>
          <Dropdown :model-value="true" label="File">
            <MenuItem>New</MenuItem>
            <MenuItem>Open</MenuItem>
          </Dropdown>
        </main>
      `,
      attachTo: document.body,
    });
    const results = await axe(wrapper.element);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});
