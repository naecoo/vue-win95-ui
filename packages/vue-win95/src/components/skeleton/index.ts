import { withInstall } from "../../utils/withInstall";
import _Skeleton from "./Skeleton.vue";

export const W95Skeleton = withInstall(_Skeleton);
export type W95SkeletonProps = {
  width?: string | number;
  height?: string | number;
  lines?: number;
};
