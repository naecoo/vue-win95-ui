import { withInstall } from "../../utils/withInstall";
import _MenuBar from "./MenuBar.vue";
import _MenuEntry from "./MenuEntry.vue";
import _MenuItem from "./MenuItem.vue";
import _MenuList from "./MenuList.vue";
import _MenuSubmenu from "./MenuSubmenu.vue";

export const W95MenuBar = withInstall(_MenuBar, "W95MenuBar");
export const W95MenuEntry = withInstall(_MenuEntry, "W95MenuEntry");
export const W95MenuItem = withInstall(_MenuItem, "W95MenuItem");
export const W95MenuList = withInstall(_MenuList, "W95MenuList");
export const W95MenuSubmenu = withInstall(_MenuSubmenu, "W95MenuSubmenu");

export type W95MenuBarProps = InstanceType<typeof W95MenuBar>["$props"];
export type W95MenuEntryProps = InstanceType<typeof W95MenuEntry>["$props"];
export type W95MenuItemProps = InstanceType<typeof W95MenuItem>["$props"];
export type W95MenuListProps = InstanceType<typeof W95MenuList>["$props"];
export type W95MenuSubmenuProps = InstanceType<typeof W95MenuSubmenu>["$props"];
