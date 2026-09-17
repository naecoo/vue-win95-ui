import { withInstall } from "../../utils/withInstall";
import _Radio from "./Radio.vue";
import _RadioGroup from "./RadioGroup.vue";

export const W95Radio = withInstall(_Radio);
export const W95RadioGroup = withInstall(_RadioGroup);

export type W95RadioProps = {
  modelValue?: string | number | boolean;
  value: string | number | boolean;
  label?: string;
  disabled?: boolean;
  name?: string;
};

export type W95RadioGroupProps = {
  modelValue?: string | number | boolean;
  legend?: string;
  name?: string;
  disabled?: boolean;
};
