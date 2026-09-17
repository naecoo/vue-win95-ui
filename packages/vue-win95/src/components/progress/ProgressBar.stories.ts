import type { Meta, StoryObj } from "@storybook/vue3";
import W95ProgressBar from "./ProgressBar.vue";

const meta: Meta<typeof W95ProgressBar> = {
  title: "Components/ProgressBar",
  component: W95ProgressBar,
  tags: ["autodocs"],
};

export default meta;

export const Solid: StoryObj = {
  render: () => ({
    components: { W95ProgressBar },
    template: `
      <div class="p-4 bg-w95-desktop w95-root w-[280px]">
        <W95ProgressBar :value="40" />
      </div>
    `,
  }),
};

export const Segmented: StoryObj = {
  render: () => ({
    components: { W95ProgressBar },
    template: `
      <div class="p-4 bg-w95-desktop w95-root w-[280px]">
        <W95ProgressBar :value="40" segmented />
      </div>
    `,
  }),
};
