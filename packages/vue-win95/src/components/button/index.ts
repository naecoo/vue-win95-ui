import { withInstall } from "../../utils/withInstall";
import _Button from "./Button.vue";

export const W95Button = withInstall(_Button);
export default W95Button;
export type W95ButtonProps = {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  default?: boolean;
  block?: boolean;
};
