import type { App, Plugin } from "vue";

import { W95Button } from "./button";
import { W95Input } from "./input";
import { W95Checkbox } from "./checkbox";
import { W95Radio, W95RadioGroup } from "./radio";
import { W95Select } from "./select";
import { W95Slider } from "./slider";
import { W95ProgressBar } from "./progress";
import { W95GroupBox } from "./group-box";
import { W95FieldRow } from "./field-row";
import { W95StatusBar, W95StatusBarField } from "./status-bar";
import { W95Divider } from "./divider";
import { W95Window } from "./window";
import { W95Dialog } from "./dialog";

export * from "./button";
export * from "./input";
export * from "./checkbox";
export * from "./radio";
export * from "./select";
export * from "./slider";
export * from "./progress";
export * from "./group-box";
export * from "./field-row";
export * from "./status-bar";
export * from "./divider";
export * from "./window";
export * from "./dialog";

const components = [
  W95Button,
  W95Input,
  W95Checkbox,
  W95Radio,
  W95RadioGroup,
  W95Select,
  W95Slider,
  W95ProgressBar,
  W95GroupBox,
  W95FieldRow,
  W95StatusBar,
  W95StatusBarField,
  W95Divider,
  W95Window,
  W95Dialog,
];

const install: Plugin = {
  install(app: App) {
    components.forEach((c) => app.use(c));
  },
};

export { install };
export default install;
