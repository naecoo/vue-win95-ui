import { describe, it, expect, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Dropdown from "../Dropdown.vue";
import MenuItem from "../../menu/MenuItem.vue";
import { $, $$, cleanupOverlays } from "../../../test-utils/dom";

afterEach(cleanupOverlays);

describe("W95Dropdown", () => {
  it("toggles menu on click", async () => {
    const wrapper = mount(
      {
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
      }
    );
    expect($('[role="menu"]')).toBeNull();
    await wrapper.find("button").trigger("click");
    expect($('[role="menu"]')).toBeTruthy();
    expect($$('[role="menuitem"]')).toHaveLength(2);
    wrapper.unmount();
  });

  it("closes when clicking outside", async () => {
    const wrapper = mount(
      {
        components: { Dropdown, MenuItem },
        template: `
          <Dropdown v-model="open" label="File"><MenuItem>New</MenuItem></Dropdown>
        `,
        data: () => ({ open: true }),
        attachTo: document.body,
      }
    );
    expect($('[role="menu"]')).toBeTruthy();
    document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    await wrapper.vm.$nextTick();
    expect($('[role="menu"]')).toBeNull();
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
    const wrapper = mount(
      {
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
      }
    );
    const results = await axe(wrapper.element);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});
