import type { Meta, StoryObj } from "@storybook/vue3";
import W95Splitter from "./Splitter.vue";

const meta: Meta<typeof W95Splitter> = {
  title: "Navigation/Splitter",
  component: W95Splitter,
  tags: ["autodocs"],
};

export default meta;

export const Vertical: StoryObj = {
  render: () => ({
    components: { W95Splitter },
    template: `
      <div class="p-6 bg-w95-desktop w95-root">
        <div class="flex h-[200px] w-[400px] shadow-w95-window bg-w95-surface p-1">
          <div class="w-[140px] bg-w95-highlight shadow-w95-field p-2 font-w95 text-w95">Sidebar</div>
          <W95Splitter vertical :min="80" :max="280" />
          <div class="flex-1 bg-w95-highlight shadow-w95-field p-2 font-w95 text-w95">Content</div>
        </div>
      </div>
    `,
  }),
};
