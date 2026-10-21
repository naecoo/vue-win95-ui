import { withInstall } from "../../utils/withInstall";
import _Button from "./Button.vue";

export const W95Button = withInstall(_Button, "W95Button");
export default W95Button;
export type W95ButtonProps = InstanceType<typeof W95Button>["$props"];
