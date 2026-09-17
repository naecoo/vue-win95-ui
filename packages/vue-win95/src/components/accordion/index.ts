import { withInstall } from "../../utils/withInstall";
import _Accordion from "./Accordion.vue";
import _AccordionItem from "./AccordionItem.vue";

export const W95Accordion = withInstall(_Accordion);
export const W95AccordionItem = withInstall(_AccordionItem);
export type W95AccordionProps = { modelValue?: string | number | null };
export type W95AccordionItemProps = {
  value: string | number;
  title?: string;
};
