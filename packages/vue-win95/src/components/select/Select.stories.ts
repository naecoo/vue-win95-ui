import type { Meta, StoryObj } from "@storybook/vue3";
import W95Select from "./Select.vue";
import { ref } from "vue";

const meta: Meta<typeof W95Select> = {
  title: "Components/Select",
  component: W95Select,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj = {
  render: () => ({
    components: { W95Select },
    setup() {
      const val = ref("3");
      const options = [
        { value: "5", label: "5 - Incredible!" },
        { value: "4", label: "4 - Great!" },
        { value: "3", label: "3 - Pretty good" },
        { value: "2", label: "2 - Not so great" },
        { value: "1", label: "1 - Unfortunate" },
      ];
      return { val, options };
    },
    template: `
      <div class="p-4 bg-w95-desktop w95-root">
        <W95Select v-model="val" :options="options" label="Rating" />
      </div>
    `,
  }),
};
