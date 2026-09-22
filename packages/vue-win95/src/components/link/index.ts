import { withInstall } from "../../utils/withInstall";
import _Link from "./Link.vue";

export const W95Link = withInstall(_Link);
export type W95LinkProps = {
  href?: string;
  disabled?: boolean;
};
