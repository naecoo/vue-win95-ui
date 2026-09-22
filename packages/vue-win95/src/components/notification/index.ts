import { withInstall } from "../../utils/withInstall";
import _Notification from "./Notification.vue";

export const W95Notification = withInstall(_Notification);
export type { W95NotifyItem, W95NotifyType } from "./Notification.vue";
export type W95NotificationProps = {
  modelValue?: {
    id: string | number;
    title?: string;
    message: string;
    type?: "info" | "success" | "warn" | "error";
    duration?: number;
  }[];
  duration?: number;
  position?: "top-right" | "bottom-right";
};
