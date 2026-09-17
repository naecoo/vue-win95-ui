import { withInstall } from "../../utils/withInstall";
import _Tabs from "./Tabs.vue";
import _TabList from "./TabList.vue";
import _Tab from "./Tab.vue";
import _TabPanel from "./TabPanel.vue";

export const W95Tabs = withInstall(_Tabs);
export const W95TabList = withInstall(_TabList);
export const W95Tab = withInstall(_Tab);
export const W95TabPanel = withInstall(_TabPanel);

export type W95TabsProps = {
  modelValue?: string | number;
};
export type W95TabProps = {
  value: string | number;
  disabled?: boolean;
};
export type W95TabPanelProps = {
  value: string | number;
};
