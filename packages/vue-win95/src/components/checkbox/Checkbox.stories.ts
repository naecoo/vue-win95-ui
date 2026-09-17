import type { Meta, StoryObj } from "@storybook/vue3";
import W95Checkbox from "./Checkbox.vue";
import { ref } from "vue";

const meta: Meta<typeof W95Checkbox> = {
  title: "Components/Checkbox",
  component: W95Checkbox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof W95Checkbox>;

export const Default: Story = {
  render: () => ({
    components: { W95Checkbox },
    setup() {
      const checked = ref(false);
      return { checked };
    },
    template: `
      <div class="p-4 bg-w95-desktop w95-root flex flex-col gap-2">
        <W95Checkbox v-model="checked" label="This is a checkbox" />
        <W95Checkbox :model-value="true" label="I am checked" />
        <W95Checkbox disabled label="I am inactive" />
        <W95Checkbox :model-value="true" disabled label="Inactive but checked" />
      </div>
    `,
  }),
};
