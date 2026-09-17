import type { Meta, StoryObj } from "@storybook/vue3";
import W95Input from "./Input.vue";
import { ref } from "vue";

const meta: Meta<typeof W95Input> = {
  title: "Components/Input",
  component: W95Input,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["text", "password", "email", "number", "search", "tel", "url"] },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof W95Input>;

export const Default: Story = {
  render: () => ({
    components: { W95Input },
    setup() {
      const value = ref("Hello");
      return { value };
    },
    template: `
      <div class="p-4 bg-w95-desktop w95-root">
        <W95Input v-model="value" label="Name" />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { W95Input },
    setup() {
      const value = ref("Windows Green");
      return { value };
    },
    template: `
      <div class="p-4 bg-w95-desktop w95-root">
        <W95Input v-model="value" label="Favorite color" disabled />
      </div>
    `,
  }),
};
