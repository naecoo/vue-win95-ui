import { withInstall } from "../../utils/withInstall";
import _Breadcrumb from "./Breadcrumb.vue";

export const W95Breadcrumb = withInstall(_Breadcrumb);
export type { W95Crumb } from "./Breadcrumb.vue";
export type W95BreadcrumbProps = {
  items?: { label: string; href?: string }[];
  separator?: string;
};
