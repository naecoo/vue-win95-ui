import { withInstall } from "../../utils/withInstall";
import _Tabs from "./Tabs.vue";
import _TabList from "./TabList.vue";
import _Tab from "./Tab.vue";
import _TabPanel from "./TabPanel.vue";

export const W95Tabs = withInstall(_Tabs, "W95Tabs");
export const W95TabList = withInstall(_TabList, "W95TabList");
export const W95Tab = withInstall(_Tab, "W95Tab");
export const W95TabPanel = withInstall(_TabPanel, "W95TabPanel");

export type W95TabsProps = InstanceType<typeof W95Tabs>["$props"];
export type W95TabProps = InstanceType<typeof W95Tab>["$props"];
export type W95TabPanelProps = InstanceType<typeof W95TabPanel>["$props"];
