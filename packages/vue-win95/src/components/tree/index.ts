import { withInstall } from "../../utils/withInstall";
import _Tree from "./Tree.vue";
import _TreeItem from "./TreeItem.vue";

export const W95Tree = withInstall(_Tree);
export const W95TreeItem = withInstall(_TreeItem);

export type W95TreeProps = {
  modelValue?: string | number | null;
};
export type W95TreeItemProps = {
  value: string | number;
  label?: string;
  disabled?: boolean;
  hasChildren?: boolean;
};
