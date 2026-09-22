import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import W95Icon from "./icon/Icon.vue";
import W95Link from "./link/Link.vue";
import W95Skeleton from "./skeleton/Skeleton.vue";
import W95Upload from "./upload/Upload.vue";
import W95Popover from "./popover/Popover.vue";
import W95Notification from "./notification/Notification.vue";
import W95Switch from "./switch/Switch.vue";
import W95Avatar from "./avatar/Avatar.vue";
import W95Breadcrumb from "./breadcrumb/Breadcrumb.vue";
import W95Pagination from "./pagination/Pagination.vue";
import W95Divider from "./divider/Divider.vue";
import W95StatusBar from "./status-bar/StatusBar.vue";
import W95StatusBarField from "./status-bar/StatusBarField.vue";
import W95Button from "./button/Button.vue";
import W95MenuSubmenu from "./menu/MenuSubmenu.vue";
import W95MenuItem from "./menu/MenuItem.vue";
import W95MenuList from "./menu/MenuList.vue";
import W95ContextMenuArea from "./context-menu/ContextMenuArea.vue";
import W95ResizablePanel from "./window/ResizablePanel.vue";
import { W95Alert, W95Confirm } from "./message";

const meta: Meta = {
  title: "Complete/All Components",
  tags: ["autodocs"],
};

export default meta;

export const IconLinkSkeleton: StoryObj = {
  render: () => ({
    components: { W95Icon, W95Link, W95Skeleton, W95Avatar, W95Switch },
    setup() {
      const on = ref(true);
      return { on };
    },
    template: `
      <div class="p-6 bg-w95-desktop w95-root flex flex-col gap-4">
        <div class="flex gap-3 items-center bg-w95-surface p-3 shadow-w95-raised">
          <W95Icon name="folder" :size="24" label="Folder" />
          <W95Icon name="computer" :size="24" label="Computer" />
          <W95Icon name="warning" :size="20" label="Warning" />
          <W95Icon name="ok" :size="20" label="OK" />
          <W95Avatar initials="W9" size="md" />
          <W95Switch v-model="on" label="On" />
          <W95Link href="#">Open help</W95Link>
        </div>
        <div class="bg-w95-surface p-3 shadow-w95-window">
          <W95Skeleton :lines="3" />
        </div>
      </div>
    `,
  }),
};

export const UploadPopover: StoryObj = {
  render: () => ({
    components: { W95Upload, W95Popover, W95Button },
    setup() {
      const files = ref([]);
      const pop = ref(false);
      return { files, pop };
    },
    template: `
      <div class="p-6 bg-w95-desktop w95-root flex flex-col gap-4">
        <div class="bg-w95-surface p-3 shadow-w95-window">
          <W95Upload v-model="files" multiple label="Browse…" />
        </div>
        <W95Popover v-model="pop" title="Tip" :width="260">
          <template #trigger>
            <W95Button @click="pop = !pop">Toggle popover</W95Button>
          </template>
          <p style="font-size:13px;margin:0">Popover body content.</p>
        </W95Popover>
      </div>
    `,
  }),
};

export const NotificationMessage: StoryObj = {
  render: () => ({
    components: { W95Notification, W95Button },
    setup() {
      const items = ref([
        { id: 1, title: "Error", message: "Disk full.", type: "error", duration: 0 },
        { id: 2, title: "Success", message: "Saved.", type: "success", duration: 0 },
      ]);
      return {
        items,
        async alert() {
          await W95Alert("Hello from MessageBox", "Alert");
        },
        async confirm() {
          const ok = await W95Confirm("Delete file?");
          items.value = [
            ...items.value,
            { id: Date.now(), title: "Confirm", message: ok ? "OK" : "Cancel", type: "info" },
          ];
        },
      };
    },
    template: `
      <div class="p-6 bg-w95-desktop w95-root">
        <div class="flex gap-2 mb-3">
          <W95Button @click="alert">Alert</W95Button>
          <W95Button default @click="confirm">Confirm</W95Button>
        </div>
        <W95Notification v-model="items" position="bottom-right" />
      </div>
    `,
  }),
};

export const MenuSubContext: StoryObj = {
  render: () => ({
    components: {
      W95MenuList,
      W95MenuItem,
      W95MenuSubmenu,
      W95ContextMenuArea,
      W95ResizablePanel,
    },
    setup() {
      const items = [
        { label: "Copy" },
        { label: "Paste" },
        { label: "Delete", disabled: true },
      ];
      return { items };
    },
    template: `
      <div class="p-6 bg-w95-desktop w95-root">
        <W95ContextMenuArea :items="items">
          <div class="bg-w95-highlight shadow-w95-field p-4 w-[320px] h-[100px]" style="font-size:13px">
            Right-click me
          </div>
        </W95ContextMenuArea>
        <div class="h-4"></div>
        <W95MenuList style="max-width:200px">
          <W95MenuItem>Open</W95MenuItem>
          <W95MenuSubmenu label="Export">
            <W95MenuItem>CSV</W95MenuItem>
            <W95MenuItem>PDF</W95MenuItem>
          </W95MenuSubmenu>
        </W95MenuList>
        <div class="h-4"></div>
        <W95ResizablePanel :width="280" :min-width="160" :max-width="400">
          <div class="bg-w95-surface shadow-w95-window h-[80px] p-2" style="font-size:13px">
            Drag right edge · keyboard ←→
          </div>
        </W95ResizablePanel>
      </div>
    `,
  }),
};

export const NavMisc: StoryObj = {
  render: () => ({
    components: {
      W95Breadcrumb,
      W95Pagination,
      W95Divider,
      W95StatusBar,
      W95StatusBarField,
    },
    setup() {
      const page = ref(1);
      return {
        page,
        crumbs: [{ label: "Desktop" }, { label: "PC" }, { label: "C:" }],
      };
    },
    template: `
      <div class="p-6 bg-w95-desktop w95-root">
        <div class="bg-w95-surface p-3 shadow-w95-window">
          <W95Breadcrumb :items="crumbs" />
          <W95Divider class="my-3" />
          <W95Pagination v-model="page" :total="50" :page-size="10" />
        </div>
        <div class="h-3"></div>
        <W95StatusBar>
          <W95StatusBarField>Ready</W95StatusBarField>
          <W95StatusBarField>Page {{ page }}</W95StatusBarField>
        </W95StatusBar>
      </div>
    `,
  }),
};
