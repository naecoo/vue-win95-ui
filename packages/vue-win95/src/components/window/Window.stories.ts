import type { Meta, StoryObj } from "@storybook/vue3";
import W95Window from "./Window.vue";
import W95Button from "../button/Button.vue";

const meta: Meta<typeof W95Window> = {
  title: "Components/Window",
  component: W95Window,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof W95Window>;

export const Complete: Story = {
  render: () => ({
    components: { W95Window, W95Button },
    template: `
      <div class="p-6 bg-w95-desktop w95-root">
        <W95Window title="My First VB4 Program" :width="320">
          <p class="mb-3">Hello, world!</p>
          <div class="flex gap-2 justify-end">
            <W95Button default>OK</W95Button>
            <W95Button>Cancel</W95Button>
          </div>
        </W95Window>
      </div>
    `,
  }),
};

export const Inactive: Story = {
  render: () => ({
    components: { W95Window },
    template: `
      <div class="p-6 bg-w95-desktop w95-root">
        <W95Window title="An inactive window" :width="280" :active="false">
          <p>Inactive title bar uses gray gradient.</p>
        </W95Window>
      </div>
    `,
  }),
};

export const WithStatusBar: Story = {
  render: () => ({
    components: { W95Window },
    template: `
      <div class="p-6 bg-w95-desktop w95-root">
        <W95Window title="Task Manager" :width="340">
          <p class="mb-2">Processes are running.</p>
          <template #status>
            <p class="shadow-w95-status flex-1 px-[3px] py-0.5 m-0">Press F1 for help</p>
            <p class="shadow-w95-status flex-1 px-[3px] py-0.5 m-0">CPU Usage: 14%</p>
          </template>
        </W95Window>
      </div>
    `,
  }),
};
