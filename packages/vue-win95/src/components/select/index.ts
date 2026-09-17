import { withInstall } from "../../utils/withInstall";
import _Select from "./Select.vue";

export const W95Select = withInstall(_Select);
export type W95SelectProps = {
  modelValue?: string | number;
  options?: { value: string | number; label: string; disabled?: boolean }[];
  disabled?: boolean;
  label?: string;
  id?: string;
};
