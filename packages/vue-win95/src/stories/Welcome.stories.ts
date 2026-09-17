import type { Meta, StoryObj } from "@storybook/vue3";
import W95Button from "../components/button/Button.vue";
import W95Window from "../components/window/Window.vue";

const meta: Meta = {
  title: "Intro/Welcome",
  tags: ["autodocs"],
};

export default meta;

export const Welcome: StoryObj = {
  render: () => ({
    components: { W95Window, W95Button },
    template: `
      <div class="p-6 bg-w95-desktop w95-root">
        <W95Window title="vue-win95" :width="360">
          <p class="mb-2">Windows 95 style Vue 3 component library.</p>
          <p class="mb-3">Browse Components, Navigation, Overlays, Data, Misc.</p>
          <W95Button default>OK</W95Button>
        </W95Window>
      </div>
    `,
  }),
};
