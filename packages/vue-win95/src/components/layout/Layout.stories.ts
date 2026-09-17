import type { Meta, StoryObj } from "@storybook/vue3";
import W95Window from "../window/Window.vue";
import W95StatusBar from "./StatusBar.vue";
import W95StatusBarField from "./StatusBarField.vue";
import W95Divider from "../divider/Divider.vue";
import W95FieldRow from "../field-row/FieldRow.vue";
import W95Button from "../button/Button.vue";
import W95Input from "../input/Input.vue";

const meta: Meta = {
  title: "Components/Layout",
  tags: ["autodocs"],
};

export default meta;

export const WindowWithStatusAndDivider: StoryObj = {
  render: () => ({
    components: {
      W95Window,
      W95StatusBar,
      W95StatusBarField,
      W95Divider,
      W95FieldRow,
      W95Button,
      W95Input,
    },
    template: `
      <div class="p-6 bg-w95-desktop w95-root">
        <W95Window title="Layout Demo" :width="360">
          <W95FieldRow>
            <W95Input label="Name" model-value="Win95" />
          </W95FieldRow>
          <W95Divider class="my-3" />
          <div class="flex gap-2 justify-end">
            <W95Button default>OK</W95Button>
            <W95Button>Cancel</W95Button>
          </div>
          <template #status>
            <W95StatusBarField>Press F1 for help</W95StatusBarField>
            <W95StatusBarField>CPU: 14%</W95StatusBarField>
          </template>
        </W95Window>
      </div>
    `,
  }),
};
