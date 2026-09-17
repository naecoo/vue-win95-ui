import { withInstall } from "../../utils/withInstall";
import _Switch from "./Switch.vue";

export const W95Switch = withInstall(_Switch);
export type W95SwitchProps = {
  modelValue?: boolean;
  label?: string;
  disabled?: boolean;
};
