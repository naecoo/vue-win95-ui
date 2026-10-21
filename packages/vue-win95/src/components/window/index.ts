import { withInstall } from "../../utils/withInstall";
import _Window from "./Window.vue";
import _ResizablePanel from "./ResizablePanel.vue";
import _Desktop from "./Desktop.vue";
import _Taskbar from "./Taskbar.vue";
import _TaskbarItem from "./TaskbarItem.vue";

export const W95Window = withInstall(_Window, "W95Window");
export const W95ResizablePanel = withInstall(_ResizablePanel, "W95ResizablePanel");
export const W95Desktop = withInstall(_Desktop, "W95Desktop");
export const W95Taskbar = withInstall(_Taskbar, "W95Taskbar");
export const W95TaskbarItem = withInstall(_TaskbarItem, "W95TaskbarItem");

export type W95WindowProps = InstanceType<typeof W95Window>["$props"];
export type W95ResizablePanelProps = InstanceType<typeof W95ResizablePanel>["$props"];
export type W95DesktopProps = InstanceType<typeof W95Desktop>["$props"];
export type W95TaskbarProps = InstanceType<typeof W95Taskbar>["$props"];
export type W95TaskbarItemProps = InstanceType<typeof W95TaskbarItem>["$props"];
