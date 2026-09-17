import { withInstall } from "../../utils/withInstall";
import _Checkbox from "./Checkbox.vue";

export const W95Checkbox = withInstall(_Checkbox);
export default W95Checkbox;
export type W95CheckboxProps = {
  modelValue?: boolean;
  label?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string | number;
};
