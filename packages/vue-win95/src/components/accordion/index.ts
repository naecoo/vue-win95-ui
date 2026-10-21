import { withInstall } from "../../utils/withInstall";
import _Accordion from "./Accordion.vue";
import _AccordionItem from "./AccordionItem.vue";

export const W95Accordion = withInstall(_Accordion, "W95Accordion");
export const W95AccordionItem = withInstall(_AccordionItem, "W95AccordionItem");
export type W95AccordionProps = InstanceType<typeof W95Accordion>["$props"];
