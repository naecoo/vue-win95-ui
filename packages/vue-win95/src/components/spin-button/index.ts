import { withInstall } from "../../utils/withInstall";
import _SpinButton from "./SpinButton.vue";

export const W95SpinButton = withInstall(_SpinButton, "W95SpinButton");
export type W95SpinButtonProps = InstanceType<typeof W95SpinButton>["$props"];
