# vue-win95

[![CI](https://github.com/naecoo/vue-win95-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/naecoo/vue-win95-ui/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://naecoo.github.io/vue-win95-ui/)

Windows 95 style Vue 3 component library.

- **Repo**: https://github.com/naecoo/vue-win95-ui
- **Docs**: https://naecoo.github.io/vue-win95-ui/
- **Stack**: Vue 3, TypeScript, Tailwind CSS (shadcn pattern)
- **A11y**: WAI-ARIA APG, semantic HTML, focus management
- **Theme**: CSS custom properties and a shared Tailwind preset

## Install

```bash
pnpm add vue-win95-ui
```

### Global

```ts
import { createApp } from "vue";
import Win95 from "vue-win95";
import "vue-win95/styles.css";

createApp(App).use(Win95).mount("#app");
```

### On-demand

```ts
import { W95Button, W95Window } from "vue-win95";
import "vue-win95/styles.css";
```

See the docs **Install** page for Tailwind preset usage.

## Theming

```css
:root {
  --w95-surface: #c0c0c0;
  --w95-dialog-blue: #000080;
  --w95-text: #222222;
}
```

## Docs site (Win95 desktop)

```bash
pnpm docs        # http://localhost:5174/vue-win95-ui/
pnpm docs:build
```

| Entry | Content |
|------|------|
| Welcome | Overview and tech stack |
| Install | Global / on-demand / Tailwind preset |
| All Components | Every export with detail modals (Props / Events / Slots) |
| Theme Editor | Live theme variable tweaks |
| Changelog | Releases and links |
| Calculator / Notepad / Minesweeper | Mini apps built with the library |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Playground |
| `pnpm docs` | Docs site |
| `pnpm test` | Vitest + axe |
| `pnpm build` | Library build |
| `pnpm release:check` | Pre-publish checks |

More:

- [Component catalog](./docs/components.md)
- [Accessibility](./docs/A11Y.md)
- [Changelog](./packages/vue-win95/CHANGELOG.md)
- [Publish guide](./docs/PUBLISH.md)
