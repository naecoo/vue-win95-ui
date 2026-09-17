import { withInstall } from "../../utils/withInstall";
import _Pagination from "./Pagination.vue";

export const W95Pagination = withInstall(_Pagination);
export type W95PaginationProps = {
  modelValue?: number;
  total?: number;
  pageSize?: number;
};
