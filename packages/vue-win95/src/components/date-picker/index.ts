import { withInstall } from "../../utils/withInstall";
import _DatePicker from "./DatePicker.vue";

export const W95DatePicker = withInstall(_DatePicker, "W95DatePicker");
export type W95DatePickerProps = InstanceType<typeof W95DatePicker>["$props"];
