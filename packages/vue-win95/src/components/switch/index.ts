import { withInstall } from "../../utils/withInstall";
import _Switch from "./Switch.vue";

export const W95Switch = withInstall(_Switch, "W95Switch");
export type W95SwitchProps = InstanceType<typeof W95Switch>["$props"];
