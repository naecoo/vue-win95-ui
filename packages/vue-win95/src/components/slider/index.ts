import { withInstall } from "../../utils/withInstall";
import _Slider from "./Slider.vue";

export const W95Slider = withInstall(_Slider, "W95Slider");
export type W95SliderProps = InstanceType<typeof W95Slider>["$props"];
