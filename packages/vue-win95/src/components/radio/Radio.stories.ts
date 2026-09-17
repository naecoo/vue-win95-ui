import type { Meta, StoryObj } from "@storybook/vue3";
import W95Radio from "./Radio.vue";
import W95RadioGroup from "./RadioGroup.vue";
import { ref } from "vue";

const meta: Meta = {
  title: "Components/Radio",
  component: W95Radio,
  tags: ["autodocs"],
};

export default meta;

export const Group: StoryObj = {
  render: () => ({
    components: { W95Radio, W95RadioGroup },
    setup() {
      const val = ref("smooth");
      return { val };
    },
    template: `
      <div class="p-4 bg-w95-desktop w95-root">
        <W95RadioGroup v-model="val" legend="Peanut butter" name="pb">
          <W95Radio value="smooth" label="Should be smooth" />
          <W95Radio value="crunchy" label="Crunchy is good" />
          <W95Radio value="either" label="I'm flexible" />
        </W95RadioGroup>
        <p class="mt-3">Selected: {{ val }}</p>
      </div>
    `,
  }),
};

export const Disabled: StoryObj = {
  render: () => ({
    components: { W95Radio, W95RadioGroup },
    setup() {
      const val = ref("yes");
      return { val };
    },
    template: `
      <div class="p-4 bg-w95-desktop w95-root">
        <W95RadioGroup v-model="val" legend="Mood">
          <W95Radio value="yes" label="Yes" />
          <W95Radio value="no" label="No" disabled />
        </W95RadioGroup>
      </div>
    `,
  }),
};
