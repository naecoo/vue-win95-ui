import { withInstall } from "../../utils/withInstall";
import _StatusBar from "./StatusBar.vue";
import _StatusBarField from "./StatusBarField.vue";

export const W95StatusBar = withInstall(_StatusBar);
export const W95StatusBarField = withInstall(_StatusBarField);

export type W95StatusBarProps = {};
export type W95StatusBarFieldProps = {
  grow?: boolean;
};
