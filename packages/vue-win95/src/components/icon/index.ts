import { withInstall } from "../../utils/withInstall";
import _Icon from "./Icon.vue";

export const W95Icon = withInstall(_Icon);
export type W95IconProps = {
  name: string;
  size?: number;
  label?: string;
};
