import { withInstall } from "../../utils/withInstall";
import _ProgressBar from "./ProgressBar.vue";

export const W95ProgressBar = withInstall(_ProgressBar, "W95ProgressBar");
export type W95ProgressBarProps = InstanceType<typeof W95ProgressBar>["$props"];
