import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import MenuBar from "../MenuBar.vue";
import MenuItem from "../MenuItem.vue";
import MenuList from "../MenuList.vue";

describe("W95Menu", () => {
  it("renders menubar and items", () => {
    const wrapper = mount({
      components: { MenuBar, MenuItem },
      template: `
        <MenuBar>
          <MenuItem>File</MenuItem>
          <MenuItem>Edit</MenuItem>
          <MenuItem disabled>Help</MenuItem>
        </MenuBar>
      `,
      attachTo: document.body,
    });
    expect(wrapper.find('[role="menubar"]').exists()).toBe(true);
    expect(wrapper.findAll('[role="menuitem"]')).toHaveLength(3);
  });

  it("emits click on item", async () => {
    let clicked = 0;
    const wrapper = mount({
      components: { MenuBar, MenuItem },
      template: `
        <MenuBar>
          <MenuItem @click="clicked++">File</MenuItem>
        </MenuBar>
      `,
      setup: () => ({
        get clicked() {
          return clicked;
        },
        set clicked(v: number) {
          clicked = v;
        },
      }),
      attachTo: document.body,
    });
    // simpler: just trigger click and check emit on component
    const item = wrapper.findComponent(MenuItem);
    await item.trigger("click");
    expect(item.emitted("click")).toHaveLength(1);
  });

  it("renders nested menu list", () => {
    const wrapper = mount({
      components: { MenuBar, MenuItem, MenuList },
      template: `
        <main>
          <MenuBar>
            <MenuItem>File</MenuItem>
          </MenuBar>
          <MenuList>
            <MenuItem>New</MenuItem>
            <MenuItem>Open</MenuItem>
          </MenuList>
        </main>
      `,
      attachTo: document.body,
    });
    expect(wrapper.findAll('[role="menu"]')).toHaveLength(1);
    expect(wrapper.findAll('[role="menuitem"]')).toHaveLength(3);
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount({
      components: { MenuBar, MenuItem },
      template: `
        <main>
          <MenuBar>
            <MenuItem>File</MenuItem>
            <MenuItem>Edit</MenuItem>
          </MenuBar>
        </main>
      `,
      attachTo: document.body,
    });
    const results = await axe(wrapper.element);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});
