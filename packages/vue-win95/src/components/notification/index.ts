import { withInstall } from "../../utils/withInstall";
import _Notification from "./Notification.vue";

export const W95Notification = withInstall(_Notification, "W95Notification");
export type { W95NotifyItem, W95NotifyType } from "./Notification.vue";
export type W95NotificationProps = InstanceType<typeof W95Notification>["$props"];
