import { withInstall } from "../../utils/withInstall";
import _Toast from "./Toast.vue";

export const W95Toast = withInstall(_Toast, "W95Toast");
export type { W95ToastItem } from "./Toast.vue";
export type W95ToastProps = InstanceType<typeof W95Toast>["$props"];
