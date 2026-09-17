import type { Meta, StoryObj } from "@storybook/vue3";
import W95Tabs from "./Tabs.vue";
import W95TabList from "./TabList.vue";
import W95Tab from "./Tab.vue";
import W95TabPanel from "./TabPanel.vue";
import { ref } from "vue";

const meta: Meta = {
  title: "Navigation/Tabs",
  tags: ["autodocs"],
};

export default meta;

export const ControlPanel: StoryObj = {
  render: () => ({
    components: { W95Tabs, W95TabList, W95Tab, W95TabPanel },
    setup() {
      const tab = ref("desktop");
      return { tab };
    },
    template: `
      <div class="p-6 bg-w95-desktop w95-root">
        <W95Tabs v-model="tab" class="w-[320px]">
          <W95TabList>
            <W95Tab value="desktop">Desktop</W95Tab>
            <W95Tab value="computer">My computer</W95Tab>
            <W95Tab value="panel">Control panel</W95Tab>
          </W95TabList>
          <W95TabPanel value="desktop">Desktop background settings.</W95TabPanel>
          <W95TabPanel value="computer">Drives and devices.</W95TabPanel>
          <W95TabPanel value="panel">System configuration.</W95TabPanel>
        </W95Tabs>
      </div>
    `,
  }),
};
