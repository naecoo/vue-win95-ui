import type { Meta, StoryObj } from "@storybook/vue3";
import W95Tooltip from "./Tooltip.vue";
import W95Toast from "./Toast.vue";
import W95Dropdown from "./Dropdown.vue";
import W95ComboBox from "./ComboBox.vue";
import W95Button from "../button/Button.vue";
import W95MenuItem from "../menu/MenuItem.vue";
import { ref } from "vue";

const meta: Meta = {
  title: "Overlays/Phase4",
  tags: ["autodocs"],
};

export default meta;

export const TooltipDemo: StoryObj = {
  render: () => ({
    components: { W95Tooltip, W95Button },
    template: `
      <div class="p-8 bg-w95-desktop w95-root">
        <W95Tooltip content="Performs the default action" placement="top">
          <W95Button default>Hover me</W95Button>
        </W95Tooltip>
      </div>
    `,
  }),
};

export const ToastDemo: StoryObj = {
  render: () => ({
    components: { W95Toast, W95Button },
    setup() {
      const toasts = ref<
        { id: number; title?: string; message: string; duration?: number }[]
      >([
        { id: 1, title: "Notepad", message: "Document saved.", duration: 0 },
      ]);
      let n = 1;
      function push() {
        toasts.value = [
          ...toasts.value,
          { id: ++n, title: "System", message: "Hello from Windows 95." },
        ];
      }
      return { toasts, push };
    },
    template: `
      <div class="p-8 bg-w95-desktop w95-root">
        <W95Button @click="push">Show toast</W95Button>
        <W95Toast v-model="toasts" />
      </div>
    `,
  }),
};

export const DropdownDemo: StoryObj = {
  render: () => ({
    components: { W95Dropdown, W95MenuItem },
    setup() {
      const open = ref(false);
      return { open };
    },
    template: `
      <div class="p-8 bg-w95-desktop w95-root">
        <W95Dropdown v-model="open" label="File">
          <W95MenuItem>New</W95MenuItem>
          <W95MenuItem>Open…</W95MenuItem>
          <W95MenuItem>Save</W95MenuItem>
          <W95MenuItem disabled>Print</W95MenuItem>
        </W95Dropdown>
      </div>
    `,
  }),
};

export const ComboBoxDemo: StoryObj = {
  render: () => ({
    components: { W95ComboBox },
    setup() {
      const val = ref<number | null>(null);
      const options = [
        { value: 1, label: "MySQL ODBC 3.51 Driver" },
        { value: 2, label: "SQL Server" },
        { value: 3, label: "Access Driver" },
      ];
      return { val, options };
    },
    template: `
      <div class="p-8 bg-w95-desktop w95-root">
        <W95ComboBox v-model="val" :options="options" label="Driver" />
        <p class="mt-2">Value: {{ val }}</p>
      </div>
    `,
  }),
};
