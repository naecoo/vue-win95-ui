import { withInstall } from "../../utils/withInstall";
import _Popover from "./Popover.vue";

export const W95Popover = withInstall(_Popover);
export type W95PopoverProps = {
  modelValue?: boolean;
  title?: string;
  width?: string | number;
};
