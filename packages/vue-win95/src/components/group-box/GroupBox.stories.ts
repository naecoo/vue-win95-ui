import type { Meta, StoryObj } from "@storybook/vue3";
import W95GroupBox from "./GroupBox.vue";
import W95Radio from "../radio/Radio.vue";
import W95RadioGroup from "../radio/RadioGroup.vue";
import { ref } from "vue";

const meta: Meta<typeof W95GroupBox> = {
  title: "Components/GroupBox",
  component: W95GroupBox,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj = {
  render: () => ({
    components: { W95GroupBox, W95Radio, W95RadioGroup },
    setup() {
      const place = ref("diners");
      return { place };
    },
    template: `
      <div class="p-4 bg-w95-desktop w95-root">
        <W95GroupBox legend="Select one:" class="w-[240px]">
          <W95RadioGroup v-model="place" name="place">
            <W95Radio value="diners" label="Diners" />
            <W95Radio value="drive-ins" label="Drive-Ins" />
            <W95Radio value="dives" label="Dives" />
          </W95RadioGroup>
        </W95GroupBox>
      </div>
    `,
  }),
};
