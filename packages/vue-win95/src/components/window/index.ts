import { withInstall } from "../../utils/withInstall";
import _Window from "./Window.vue";
import _ResizablePanel from "./ResizablePanel.vue";

export const W95Window = withInstall(_Window);
export const W95ResizablePanel = withInstall(_ResizablePanel);

export type W95WindowProps = {
  title?: string;
  active?: boolean;
  showMinimize?: boolean;
  showMaximize?: boolean;
  showClose?: boolean;
  width?: string | number;
};
export type W95ResizablePanelProps = {
  width?: number;
  minWidth?: number;
  maxWidth?: number;
};
