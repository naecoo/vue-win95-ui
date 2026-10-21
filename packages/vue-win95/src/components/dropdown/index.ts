import { withInstall } from "../../utils/withInstall";
import _Dropdown from "./Dropdown.vue";

export const W95Dropdown = withInstall(_Dropdown, "W95Dropdown");
export type W95DropdownProps = InstanceType<typeof W95Dropdown>["$props"];
