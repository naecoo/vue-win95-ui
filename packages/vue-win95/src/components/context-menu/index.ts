import { withInstall } from "../../utils/withInstall";
import _ContextMenu from "./ContextMenu.vue";
import _ContextMenuArea from "./ContextMenuArea.vue";

export const W95ContextMenu = withInstall(_ContextMenu, "W95ContextMenu");
export const W95ContextMenuArea = withInstall(_ContextMenuArea, "W95ContextMenuArea");

export type {
  W95ContextMenuItem,
  W95ContextMenuProps,
  W95ContextMenuAreaProps,
} from "./types";
