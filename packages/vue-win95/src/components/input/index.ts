import { withInstall } from "../../utils/withInstall";
import _Input from "./Input.vue";

export const W95Input = withInstall(_Input, "W95Input");
export default W95Input;
export type W95InputProps = InstanceType<typeof W95Input>["$props"];
