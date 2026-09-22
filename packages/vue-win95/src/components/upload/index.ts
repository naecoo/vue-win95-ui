import { withInstall } from "../../utils/withInstall";
import _Upload from "./Upload.vue";

export const W95Upload = withInstall(_Upload);
export type { W95UploadFile } from "./Upload.vue";
export type W95UploadProps = {
  modelValue?: { name: string; size: number; file: File }[];
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  label?: string;
};
