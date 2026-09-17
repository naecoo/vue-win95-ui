import { withInstall } from "../../utils/withInstall";
import _Avatar from "./Avatar.vue";

export const W95Avatar = withInstall(_Avatar);
export type W95AvatarProps = {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
};
