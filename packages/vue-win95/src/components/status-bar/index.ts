import { withInstall } from "../../utils/withInstall";
import _StatusBar from "./StatusBar.vue";
import _StatusBarField from "./StatusBarField.vue";

export const W95StatusBar = withInstall(_StatusBar, "W95StatusBar");
export const W95StatusBarField = withInstall(_StatusBarField, "W95StatusBarField");

export type W95StatusBarProps = InstanceType<typeof W95StatusBar>["$props"];
