import { withInstall } from "../../utils/withInstall";
import _ContextMenu from "./ContextMenu.vue";
import _ContextMenuArea from "./ContextMenuArea.vue";

export const W95ContextMenu = withInstall(_ContextMenu);
export const W95ContextMenuArea = withInstall(_ContextMenuArea);

export type {
  W95MenuEntry,
  W95ContextMenuProps,
  W95ContextMenuAreaProps,
} from "./types";
