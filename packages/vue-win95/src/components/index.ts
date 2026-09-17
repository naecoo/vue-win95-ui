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
import { W95Tabs, W95TabList, W95Tab, W95TabPanel } from "./tabs";
import { W95MenuBar, W95MenuItem, W95MenuList } from "./menu";
import { W95Toolbar } from "./toolbar";
import { W95Tree, W95TreeItem } from "./tree";
import { W95Splitter } from "./splitter";
import { W95Window } from "./window";
import { W95Dialog } from "./dialog";
import { W95Tooltip } from "./tooltip";
import { W95Toast } from "./toast";
import { W95Dropdown } from "./dropdown";
import { W95ComboBox } from "./combobox";
import { W95Table } from "./table";
import { W95SpinButton } from "./spin-button";
import { W95DatePicker } from "./date-picker";

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
export * from "./tabs";
export * from "./menu";
export * from "./toolbar";
export * from "./tree";
export * from "./splitter";
export * from "./window";
export * from "./dialog";
export * from "./tooltip";
export * from "./toast";
export * from "./dropdown";
export * from "./combobox";
export * from "./table";
export * from "./spin-button";
export * from "./date-picker";

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
  W95Tabs,
  W95TabList,
  W95Tab,
  W95TabPanel,
  W95MenuBar,
  W95MenuItem,
  W95MenuList,
  W95Toolbar,
  W95Tree,
  W95TreeItem,
  W95Splitter,
  W95Window,
  W95Dialog,
  W95Tooltip,
  W95Toast,
  W95Dropdown,
  W95ComboBox,
  W95Table,
  W95SpinButton,
  W95DatePicker,
];

const install: Plugin = {
  install(app: App) {
    components.forEach((c) => app.use(c));
  },
};

export { install };
export default install;
