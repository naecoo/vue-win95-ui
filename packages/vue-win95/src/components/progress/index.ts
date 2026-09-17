import { withInstall } from "../../utils/withInstall";
import _ProgressBar from "./ProgressBar.vue";

export const W95ProgressBar = withInstall(_ProgressBar);
export type W95ProgressBarProps = {
  value?: number;
  max?: number;
  segmented?: boolean;
  label?: string;
};
