import { withInstall } from "../../utils/withInstall";
import _Pagination from "./Pagination.vue";

export const W95Pagination = withInstall(_Pagination, "W95Pagination");
export type W95PaginationProps = InstanceType<typeof W95Pagination>["$props"];
