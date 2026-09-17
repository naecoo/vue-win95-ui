import type { Meta, StoryObj } from "@storybook/vue3";
import W95Tree from "./Tree.vue";
import W95TreeItem from "./TreeItem.vue";
import { ref } from "vue";

const meta: Meta = {
  title: "Navigation/Tree",
  tags: ["autodocs"],
};

export default meta;

export const TableOfContents: StoryObj = {
  render: () => ({
    components: { W95Tree, W95TreeItem },
    setup() {
      const sel = ref("toc");
      return { sel };
    },
    template: `
      <div class="p-6 bg-w95-desktop w95-root">
        <W95Tree v-model="sel" class="w-[260px]">
          <W95TreeItem value="toc" label="Table of Contents" />
          <W95TreeItem value="web" label="What is web development?" />
          <W95TreeItem value="css" label="CSS" has-children>
            <W95TreeItem value="selectors" label="Selectors" />
            <W95TreeItem value="specificity" label="Specificity" />
            <W95TreeItem value="properties" label="Properties" />
          </W95TreeItem>
          <W95TreeItem value="js" label="JavaScript" has-children>
            <W95TreeItem value="avoid" label="Avoid at all costs" />
          </W95TreeItem>
          <W95TreeItem value="thanks" label="Special Thanks" />
        </W95Tree>
        <p class="mt-3">Selected: {{ sel }}</p>
      </div>
    `,
  }),
};
