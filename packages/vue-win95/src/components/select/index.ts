import { withInstall } from "../../utils/withInstall";
import _Select from "./Select.vue";

export const W95Select = withInstall(_Select, "W95Select");
export type W95SelectProps = InstanceType<typeof W95Select>["$props"];
