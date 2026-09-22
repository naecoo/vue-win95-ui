import { withInstall } from "../../utils/withInstall";
import _Table from "./Table.vue";

export const W95Table = withInstall(_Table);
export type { W95TableColumn } from "./Table.vue";
export type W95TableProps = {
  columns: { key: string; label: string; width?: string | number }[];
  rows?: Record<string, unknown>[];
  selectedKey?: string | number | null;
  rowKey?: string;
  interactive?: boolean;
  height?: string | number;
  emptyText?: string;
};
