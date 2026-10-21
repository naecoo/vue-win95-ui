import { withInstall } from "../../utils/withInstall";
import _Dialog from "./Dialog.vue";

export const W95Dialog = withInstall(_Dialog, "W95Dialog");
export default W95Dialog;
export type W95DialogProps = InstanceType<typeof W95Dialog>["$props"];
