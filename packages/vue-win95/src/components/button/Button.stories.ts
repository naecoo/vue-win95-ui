import type { Meta, StoryObj } from "@storybook/vue3";
import W95Button from "./Button.vue";

const meta: Meta<typeof W95Button> = {
  title: "Components/Button",
  component: W95Button,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["button", "submit", "reset"] },
    disabled: { control: "boolean" },
    default: { control: "boolean" },
    block: { control: "boolean" },
  },
  args: {
    type: "button",
    disabled: false,
    default: false,
    block: false,
  },
};

export default meta;
type Story = StoryObj<typeof W95Button>;

export const Default: Story = {
  render: (args) => ({
    components: { W95Button },
    setup: () => ({ args }),
    template: `<W95Button v-bind="args">Click me</W95Button>`,
  }),
};

export const Primary: Story = {
  args: { default: true },
  render: (args) => ({
    components: { W95Button },
    setup: () => ({ args }),
    template: `<W95Button v-bind="args">OK</W95Button>`,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    components: { W95Button },
    setup: () => ({ args }),
    template: `<W95Button v-bind="args">Cannot click</W95Button>`,
  }),
};

export const AllStates: Story = {
  render: () => ({
    components: { W95Button },
    template: `
      <div class="flex flex-wrap items-center gap-2 p-4 bg-w95-desktop w95-root">
        <W95Button>Normal</W95Button>
        <W95Button default>Default</W95Button>
        <W95Button disabled>Disabled</W95Button>
      </div>
    `,
  }),
};
