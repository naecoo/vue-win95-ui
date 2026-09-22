import type { ComponentResolver } from "unplugin-vue-components/types";

const components = new Set([
  "W95Accordion",
  "W95AccordionItem",
  "W95Avatar",
  "W95Breadcrumb",
  "W95Button",
  "W95Checkbox",
  "W95ComboBox",
  "W95ContextMenu",
  "W95ContextMenuArea",
  "W95DatePicker",
  "W95Dialog",
  "W95Divider",
  "W95Dropdown",
  "W95FieldRow",
  "W95GroupBox",
  "W95Icon",
  "W95Input",
  "W95Link",
  "W95MenuBar",
  "W95MenuItem",
  "W95MenuList",
  "W95MenuSubmenu",
  "W95Notification",
  "W95Pagination",
  "W95Popover",
  "W95ProgressBar",
  "W95Radio",
  "W95RadioGroup",
  "W95ResizablePanel",
  "W95Select",
  "W95Skeleton",
  "W95Slider",
  "W95SpinButton",
  "W95Splitter",
  "W95StatusBar",
  "W95StatusBarField",
  "W95Switch",
  "W95Tab",
  "W95TabList",
  "W95TabPanel",
  "W95Table",
  "W95Tabs",
  "W95Toast",
  "W95Toolbar",
  "W95Tooltip",
  "W95Tree",
  "W95TreeItem",
  "W95Upload",
  "W95Window",
]);

export function VueWin95Resolver(): ComponentResolver {
  return {
    type: "component",
    resolve(name: string) {
      if (!components.has(name)) return;
      return { name, from: "vue-win95" };
    },
  };
}

export default VueWin95Resolver;
