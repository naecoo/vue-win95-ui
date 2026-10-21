import { withInstall } from "../../utils/withInstall";
import _Tree from "./Tree.vue";
import _TreeItem from "./TreeItem.vue";

export const W95Tree = withInstall(_Tree, "W95Tree");
export const W95TreeItem = withInstall(_TreeItem, "W95TreeItem");

export type { TreeNode } from "./context";
export type W95TreeProps = InstanceType<typeof W95Tree>["$props"];
export type W95TreeItemProps = InstanceType<typeof W95TreeItem>["$props"];
