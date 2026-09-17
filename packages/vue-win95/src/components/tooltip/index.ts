import { withInstall } from "../../utils/withInstall";
import _Tooltip from "./Tooltip.vue";

export const W95Tooltip = withInstall(_Tooltip);
export type W95TooltipProps = {
  content?: string;
  placement?: "top" | "bottom" | "left" | "right";
  openDelay?: number;
};
