import { withInstall } from "../../utils/withInstall";
import _Dialog from "./Dialog.vue";

export const W95Dialog = withInstall(_Dialog);
export default W95Dialog;
export type W95DialogProps = {
  modelValue: boolean;
  title?: string;
  showClose?: boolean;
  width?: string | number;
  closeOnOverlay?: boolean;
};
