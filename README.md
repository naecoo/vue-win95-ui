# vue-win95

[![CI](https://github.com/naecoo/vue-win95-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/naecoo/vue-win95-ui/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://naecoo.github.io/vue-win95-ui/)

**English** | [中文](./README_ZH.md)

Windows 95 style Vue 3 component library.

- **Repo**: [github.com/naecoo/vue-win95-ui](https://github.com/naecoo/vue-win95-ui)
- **Live docs**: [naecoo.github.io/vue-win95-ui](https://naecoo.github.io/vue-win95-ui/)
- **Stack**: Vue 3 · TypeScript · Tailwind CSS (shadcn pattern)
- **A11y**: WAI-ARIA APG patterns, semantic HTML, focus management
- **Theme**: CSS custom properties + shared Tailwind preset

## Install

```bash
pnpm add vue-win95
# or: npm i vue-win95
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

See the docs site **Install** page for Tailwind preset usage.

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
| Welcome | Library overview and tech stack |
| Install | Global / on-demand / Tailwind preset |
| All Components | Every export with detail modals (Props / Events / Slots) |
| Theme Editor | Live `--w95-*` variable tweaks |
| Changelog & Sponsor | Releases and links |
| Calculator / Notepad / Minesweeper | Mini apps built with the library |

The docs shell is a Win95 desktop (icons, Start menu, taskbar, draggable windows) with zh/en i18n.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | playground |
| `pnpm docs` | Win95 MDX docs site |
| `pnpm test` | Vitest + axe |
| `pnpm build` | library build |
| `pnpm release:check` | pre-publish checks |

- Component catalog: [docs/components.md](./docs/components.md)
- Accessibility notes: [docs/A11Y.md](./docs/A11Y.md)
- Changelog: [packages/vue-win95/CHANGELOG.md](./packages/vue-win95/CHANGELOG.md)
- Publish guide: [docs/PUBLISH.md](./docs/PUBLISH.md)
