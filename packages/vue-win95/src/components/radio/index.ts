import { withInstall } from "../../utils/withInstall";
import _Radio from "./Radio.vue";
import _RadioGroup from "./RadioGroup.vue";

export const W95Radio = withInstall(_Radio, "W95Radio");
export const W95RadioGroup = withInstall(_RadioGroup, "W95RadioGroup");

export type W95RadioProps = InstanceType<typeof W95Radio>["$props"];

export type W95RadioGroupProps = InstanceType<typeof W95RadioGroup>["$props"];
