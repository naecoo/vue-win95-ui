import { withInstall } from "../../utils/withInstall";
import _SpinButton from "./SpinButton.vue";

export const W95SpinButton = withInstall(_SpinButton);
export type W95SpinButtonProps = {
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
};
