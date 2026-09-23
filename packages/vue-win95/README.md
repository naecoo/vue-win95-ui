# vue-win95

Windows 95 style Vue 3 component library — TypeScript + Tailwind (shadcn pattern) + WAI-ARIA.

```bash
pnpm add vue-win95-ui
```

### Global install

```ts
import { createApp } from "vue";
import Win95 from "vue-win95";
import "vue-win95/styles.css";

createApp(App).use(Win95).mount("#app");
```

### On-demand import

```ts
import { W95Button, W95Dialog } from "vue-win95";
import "vue-win95/styles.css";
```

- Theme via `--w95-*` CSS variables
- Component catalog: `docs/components.md`
- Changelog: `CHANGELOG.md`
- Sponsor / links: see Changelog in the docs site
