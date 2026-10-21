import { withInstall } from "../../utils/withInstall";
import _Form from "./Form.vue";
import _FormItem from "./FormItem.vue";

export const W95Form = withInstall(_Form, "W95Form");
export const W95FormItem = withInstall(_FormItem, "W95FormItem");

export type W95FormProps = InstanceType<typeof W95Form>["$props"];
export type W95FormItemProps = InstanceType<typeof W95FormItem>["$props"];
