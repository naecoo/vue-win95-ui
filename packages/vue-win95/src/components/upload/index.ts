import { withInstall } from "../../utils/withInstall";
import _Upload from "./Upload.vue";

export const W95Upload = withInstall(_Upload, "W95Upload");
export type { W95UploadFile } from "./Upload.vue";
export type W95UploadProps = InstanceType<typeof W95Upload>["$props"];
