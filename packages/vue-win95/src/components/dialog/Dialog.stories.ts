import type { Meta, StoryObj } from "@storybook/vue3";
import W95Dialog from "./Dialog.vue";
import W95Button from "../button/Button.vue";
import { ref } from "vue";

const meta: Meta<typeof W95Dialog> = {
  title: "Components/Dialog",
  component: W95Dialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof W95Dialog>;

export const Default: Story = {
  render: () => ({
    components: { W95Dialog, W95Button },
    setup() {
      const open = ref(true);
      return { open };
    },
    template: `
      <div class="p-6 bg-w95-desktop w95-root min-h-[400px]">
        <W95Button @click="open = true">Open Dialog</W95Button>
        <W95Dialog v-model="open" title="Confirm" @confirm="open = false">
          <p>Are you sure you want to continue?</p>
        </W95Dialog>
      </div>
    `,
  }),
};

export const Closed: Story = {
  render: () => ({
    components: { W95Dialog, W95Button },
    setup() {
      const open = ref(false);
      return { open };
    },
    template: `
      <div class="p-6 bg-w95-desktop w95-root min-h-[200px]">
        <W95Button @click="open = true">Open Dialog</W95Button>
        <W95Dialog v-model="open" title="Hello">
          <p>Dialog content here.</p>
        </W95Dialog>
      </div>
    `,
  }),
};
