import { withInstall } from "../../utils/withInstall";
import _MenuBar from "./MenuBar.vue";
import _MenuItem from "./MenuItem.vue";
import _MenuList from "./MenuList.vue";

export const W95MenuBar = withInstall(_MenuBar);
export const W95MenuItem = withInstall(_MenuItem);
export const W95MenuList = withInstall(_MenuList);

export type W95MenuItemProps = {
  disabled?: boolean;
};
