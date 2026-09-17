import { withInstall } from "../../utils/withInstall";
import _Splitter from "./Splitter.vue";

export const W95Splitter = withInstall(_Splitter);
export type W95SplitterProps = {
  vertical?: boolean;
  min?: number;
  max?: number;
};
