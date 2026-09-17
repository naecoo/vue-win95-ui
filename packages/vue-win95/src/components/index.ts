import type { App, Plugin } from "vue";

import { W95Button } from "./button";
import { W95Input } from "./input";
import { W95Checkbox } from "./checkbox";
import { W95Window } from "./window";
import { W95Dialog } from "./dialog";

export * from "./button";
export * from "./input";
export * from "./checkbox";
export * from "./window";
export * from "./dialog";

const components = [W95Button, W95Input, W95Checkbox, W95Window, W95Dialog];

const install: Plugin = {
  install(app: App) {
    components.forEach((c) => app.use(c));
  },
};

export { install };
export default install;
