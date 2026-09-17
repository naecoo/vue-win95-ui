import { withInstall } from "../../utils/withInstall";
import _Slider from "./Slider.vue";

export const W95Slider = withInstall(_Slider);
export type W95SliderProps = {
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  id?: string;
};
