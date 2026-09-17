import type { Meta, StoryObj } from "@storybook/vue3";
import W95MenuBar from "./MenuBar.vue";
import W95MenuItem from "./MenuItem.vue";
import W95Window from "../window/Window.vue";
import W95Toolbar from "../toolbar/Toolbar.vue";
import W95Button from "../button/Button.vue";

const meta: Meta = {
  title: "Navigation/MenuToolbar",
  tags: ["autodocs"],
};

export default meta;

export const WithMenuBar: StoryObj = {
  render: () => ({
    components: { W95Window, W95MenuBar, W95MenuItem, W95Toolbar, W95Button },
    template: `
      <div class="p-6 bg-w95-desktop w95-root">
        <W95Window title="Notepad" :width="360">
          <W95MenuBar class="mb-2 -mt-1 -mx-1">
            <W95MenuItem>File</W95MenuItem>
            <W95MenuItem>Edit</W95MenuItem>
            <W95MenuItem>Search</W95MenuItem>
            <W95MenuItem disabled>Help</W95MenuItem>
          </W95MenuBar>
          <W95Toolbar class="mb-2 -mx-1">
            <W95Button>New</W95Button>
            <W95Button>Open</W95Button>
            <W95Button>Save</W95Button>
          </W95Toolbar>
          <p>Document content goes here…</p>
        </W95Window>
      </div>
    `,
  }),
};
