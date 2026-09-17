import { withInstall } from "../../utils/withInstall";
import _Input from "./Input.vue";

export const W95Input = withInstall(_Input);
export default W95Input;
export type W95InputProps = {
  modelValue?: string;
  type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url";
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  label?: string;
  id?: string;
};
