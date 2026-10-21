import { withInstall } from "../../utils/withInstall";
import _ComboBox from "./ComboBox.vue";

export const W95ComboBox = withInstall(_ComboBox, "W95ComboBox");
export type { W95ComboOption } from "./ComboBox.vue";
export type W95ComboBoxProps = InstanceType<typeof W95ComboBox>["$props"];
