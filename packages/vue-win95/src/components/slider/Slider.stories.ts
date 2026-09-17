import type { Meta, StoryObj } from "@storybook/vue3";
import W95Slider from "./Slider.vue";
import { ref } from "vue";

const meta: Meta<typeof W95Slider> = {
  title: "Components/Slider",
  component: W95Slider,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj = {
  render: () => ({
    components: { W95Slider },
    setup() {
      const vol = ref(5);
      return { vol };
    },
    template: `
      <div class="p-4 bg-w95-desktop w95-root w-[300px]">
        <W95Slider v-model="vol" :min="1" :max="11" label="Volume:" />
        <p class="mt-2">Value: {{ vol }}</p>
      </div>
    `,
  }),
};
