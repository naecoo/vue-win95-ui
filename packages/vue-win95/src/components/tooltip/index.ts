import { withInstall } from "../../utils/withInstall";
import _Tooltip from "./Tooltip.vue";

export const W95Tooltip = withInstall(_Tooltip, "W95Tooltip");
export type W95TooltipProps = InstanceType<typeof W95Tooltip>["$props"];
