import { withInstall } from "../../utils/withInstall";
import _Toast from "./Toast.vue";

export const W95Toast = withInstall(_Toast);
export type { W95ToastItem } from "./Toast.vue";
export type W95ToastProps = {
  modelValue?: { id: string | number; title?: string; message: string; duration?: number }[];
  duration?: number;
};
