import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Tree from "../Tree.vue";
import TreeItem from "../TreeItem.vue";

describe("W95Tree", () => {
  it("renders tree role and items", () => {
    const wrapper = mount({
      components: { Tree, TreeItem },
      template: `
        <Tree v-model="sel">
          <TreeItem value="toc" label="Table of Contents" />
          <TreeItem value="css" label="CSS" has-children>
            <TreeItem value="selectors" label="Selectors" />
            <TreeItem value="specificity" label="Specificity" />
          </TreeItem>
        </Tree>
      `,
      data: () => ({ sel: null }),
      attachTo: document.body,
    });
    expect(wrapper.find('[role="tree"]').exists()).toBe(true);
    expect(wrapper.findAll('[role="treeitem"]').length).toBeGreaterThanOrEqual(2);
  });

  it("selects item on click", async () => {
    const wrapper = mount({
      components: { Tree, TreeItem },
      template: `
        <Tree v-model="sel">
          <TreeItem value="a" label="A" />
          <TreeItem value="b" label="B" />
        </Tree>
      `,
      data: () => ({ sel: null }),
      attachTo: document.body,
    });
    const items = wrapper.findAll('[role="treeitem"]');
    await items[1]!.trigger("click");
    expect(wrapper.vm.sel).toBe("b");
    expect(items[1]!.attributes("aria-selected")).toBe("true");
  });

  it("expands children", async () => {
    const wrapper = mount({
      components: { Tree, TreeItem },
      template: `
        <Tree>
          <TreeItem value="css" label="CSS" has-children>
            <TreeItem value="sel" label="Selectors" />
          </TreeItem>
        </Tree>
      `,
      attachTo: document.body,
    });
    const toggle = wrapper.find('button[aria-label="Expand"]');
    expect(toggle.exists()).toBe(true);
    await toggle.trigger("click");
    expect(wrapper.find('button[aria-label="Collapse"]').exists()).toBe(true);
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount({
      components: { Tree, TreeItem },
      template: `
        <main>
          <Tree v-model="sel">
            <TreeItem value="a" label="Alpha" />
            <TreeItem value="b" label="Beta" />
          </Tree>
        </main>
      `,
      data: () => ({ sel: "a" }),
      attachTo: document.body,
    });
    const results = await axe(wrapper.element);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});
