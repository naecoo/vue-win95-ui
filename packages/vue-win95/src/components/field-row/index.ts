import { withInstall } from "../../utils/withInstall";
import _FieldRow from "./FieldRow.vue";

export const W95FieldRow = withInstall(_FieldRow);
export type W95FieldRowProps = {
  stacked?: boolean;
};
