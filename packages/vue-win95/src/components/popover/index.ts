import { withInstall } from "../../utils/withInstall";
import _Popover from "./Popover.vue";

export const W95Popover = withInstall(_Popover, "W95Popover");
export type W95PopoverProps = InstanceType<typeof W95Popover>["$props"];
