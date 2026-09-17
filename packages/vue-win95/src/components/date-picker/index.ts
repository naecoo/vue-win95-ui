import { withInstall } from "../../utils/withInstall";
import _DatePicker from "./DatePicker.vue";

export const W95DatePicker = withInstall(_DatePicker);
export type W95DatePickerProps = {
  modelValue?: string | null;
  label?: string;
};
