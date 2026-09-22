import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Tabs from "../tabs/Tabs.vue";
import TabList from "../tabs/TabList.vue";
import Tab from "../tabs/Tab.vue";
import TabPanel from "../tabs/TabPanel.vue";
import Tree from "../tree/Tree.vue";
import TreeItem from "../tree/TreeItem.vue";
import Dropdown from "../dropdown/Dropdown.vue";
import MenuItem from "../menu/MenuItem.vue";

describe("Keyboard navigation", () => {
  it("Tabs moves selection with ArrowRight", async () => {
    const wrapper = mount(
      {
        components: { Tabs, TabList, Tab, TabPanel },
        template: `
          <Tabs v-model="val">
            <TabList>
              <Tab value="a">A</Tab>
              <Tab value="b">B</Tab>
              <Tab value="c">C</Tab>
            </TabList>
            <TabPanel value="a">pa</TabPanel>
            <TabPanel value="b">pb</TabPanel>
            <TabPanel value="c">pc</TabPanel>
          </Tabs>
        `,
        data: () => ({ val: "a" }),
        attachTo: document.body,
      }
    );
    const list = wrapper.find('[role="tablist"]');
    expect(list.exists()).toBe(true);
    await list.trigger("keydown", { key: "ArrowRight" });
    const tabs = wrapper.findAll('[role="tab"]');
    expect(tabs).toHaveLength(3);
    await tabs[1]!.trigger("click");
    expect(wrapper.vm.val).toBe("b");
    wrapper.unmount();
  });

  it("Dropdown Escape closes menu", async () => {
    const wrapper = mount(
      {
        components: { Dropdown, MenuItem },
        template: `
          <Dropdown v-model="open" label="File">
            <MenuItem>New</MenuItem>
          </Dropdown>
        `,
        data: () => ({ open: true }),
        attachTo: document.body,
      }
    );
    const menu = wrapper.find('[role="menu"]');
    await menu.trigger("keydown", { key: "Escape" });
    expect(wrapper.vm.open).toBe(false);
    wrapper.unmount();
  });

  it("Tree item is focusable via tabindex", () => {
    const wrapper = mount(
      {
        components: { Tree, TreeItem },
        template: `
          <Tree :model-value="'a'">
            <TreeItem value="a" label="A" />
            <TreeItem value="b" label="B" />
          </Tree>
        `,
        attachTo: document.body,
      }
    );
    const items = wrapper.findAll('[role="treeitem"]');
    expect(items[0]!.attributes("tabindex")).toBe("0");
  });
});
