import { withInstall } from "../../utils/withInstall";
import _Table from "./Table.vue";

export const W95Table = withInstall(_Table, "W95Table");
export type { W95TableColumn } from "./Table.vue";
export type W95TableProps = InstanceType<typeof W95Table>["$props"];
