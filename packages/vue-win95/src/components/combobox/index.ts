import { withInstall } from "../../utils/withInstall";
import _ComboBox from "./ComboBox.vue";

export const W95ComboBox = withInstall(_ComboBox);
export type { W95ComboOption } from "./ComboBox.vue";
export type W95ComboBoxProps = {
  modelValue?: string | number | null;
  options?: { value: string | number; label: string; disabled?: boolean }[];
  label?: string;
  disabled?: boolean;
};
