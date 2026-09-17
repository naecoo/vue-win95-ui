import { withInstall } from "../../utils/withInstall";
import _Dropdown from "./Dropdown.vue";

export const W95Dropdown = withInstall(_Dropdown);
export type W95DropdownProps = {
  modelValue?: boolean;
  label?: string;
};
