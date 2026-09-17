import { withInstall } from "../../utils/withInstall";
import _Window from "./Window.vue";

export const W95Window = withInstall(_Window);
export default W95Window;
export type W95WindowProps = {
  title?: string;
  active?: boolean;
  showMinimize?: boolean;
  showMaximize?: boolean;
  showClose?: boolean;
  width?: string | number;
};
