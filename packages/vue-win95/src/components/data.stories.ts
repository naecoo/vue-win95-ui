import type { Meta, StoryObj } from "@storybook/vue3";
import W95Table from "./Table.vue";
import W95SpinButton from "./SpinButton.vue";
import W95DatePicker from "./DatePicker.vue";
import { ref } from "vue";

const meta: Meta = {
  title: "Data/Phase5",
  tags: ["autodocs"],
};

export default meta;

export const TableView: StoryObj = {
  render: () => ({
    components: { W95Table },
    setup() {
      const selected = ref<string | number | null>(null);
      const columns = [
        { key: "name", label: "Name", width: 160 },
        { key: "version", label: "Version", width: 80 },
        { key: "company", label: "Company" },
      ];
      const rows = [
        { id: 1, name: "MySQL ODBC 3.51 Driver", version: "3.51.11", company: "MySQL AB" },
        { id: 2, name: "SQL Server", version: "3.70.06", company: "Microsoft" },
        { id: 3, name: "Access Driver", version: "4.00", company: "Microsoft" },
      ];
      return { selected, columns, rows };
    },
    template: `
      <div class="p-6 bg-w95-desktop w95-root">
        <W95Table
          v-model:selected-key="selected"
          :columns="columns"
          :rows="rows"
          :height="120"
          class="w-[400px]"
        />
        <p class="mt-2">Selected: {{ selected }}</p>
      </div>
    `,
  }),
};

export const SpinAndDate: StoryObj = {
  render: () => ({
    components: { W95SpinButton, W95DatePicker },
    setup() {
      const count = ref(3);
      const date = ref("2024-06-15");
      return { count, date };
    },
    template: `
      <div class="p-6 bg-w95-desktop w95-root flex flex-col gap-3">
        <W95SpinButton v-model="count" :min="0" :max="10" label="Copies" />
        <W95DatePicker v-model="date" label="Date" />
        <p>count={{ count }} date={{ date }}</p>
      </div>
    `,
  }),
};
