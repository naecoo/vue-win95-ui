import type { Meta, StoryObj } from "@storybook/vue3";
import W95Accordion from "./accordion/Accordion.vue";
import W95AccordionItem from "./accordion/AccordionItem.vue";
import W95Breadcrumb from "./breadcrumb/Breadcrumb.vue";
import W95Pagination from "./pagination/Pagination.vue";
import W95Switch from "./switch/Switch.vue";
import W95Avatar from "./avatar/Avatar.vue";
import { ref } from "vue";

const meta: Meta = {
  title: "Misc/PhaseExtra",
  tags: ["autodocs"],
};

export default meta;

export const MiscGallery: StoryObj = {
  render: () => ({
    components: {
      W95Accordion,
      W95AccordionItem,
      W95Breadcrumb,
      W95Pagination,
      W95Switch,
      W95Avatar,
    },
    setup() {
      const open = ref("a");
      const page = ref(1);
      const on = ref(true);
      const crumbs = [
        { label: "Desktop" },
        { label: "My Computer" },
        { label: "C:" },
      ];
      return { open, page, on, crumbs };
    },
    template: `
      <div class="p-6 bg-w95-desktop w95-root flex flex-col gap-4 w-[360px]">
        <W95Breadcrumb :items="crumbs" />
        <div class="flex items-center gap-3">
          <W95Avatar initials="W9" />
          <W95Switch v-model="on" label="Sound" />
        </div>
        <W95Accordion v-model="open">
          <W95AccordionItem value="a" title="General">System settings.</W95AccordionItem>
          <W95AccordionItem value="b" title="Appearance">Theme options.</W95AccordionItem>
        </W95Accordion>
        <W95Pagination v-model="page" :total="40" :page-size="10" />
      </div>
    `,
  }),
};
