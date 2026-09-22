# vue-win95

[![CI](https://github.com/naecoo/vue-win95-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/naecoo/vue-win95-ui/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Windows 95 style Vue 3 component library.

- **Repo**: [github.com/naecoo/vue-win95-ui](https://github.com/naecoo/vue-win95-ui)
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

See docs site **安装 Install** for Tailwind preset usage.

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
pnpm docs        # http://localhost:5174
pnpm docs:build
```

| 页面 | 内容 |
|------|------|
| Welcome | 组件库内容与技术栈 |
| Install | 全局 / 按需 / Tailwind preset |
| Button · Form · Window · Navigation | 组件说明 + live demo |
| Overlays · Data · Misc | 其余组件分类 |
| Gallery | 综合演示 |
| Changelog & Sponsor | 版本历史与链接 |

特色：桌面图标、Start 菜单、任务栏、可拖拽窗口；`.mdx` 文档内嵌真实组件。

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | playground |
| `pnpm docs` | Win95 MDX 文档站 |
| `pnpm story` | Storybook |
| `pnpm test` | Vitest + axe |
| `pnpm build` | library build |

- Component catalog: [docs/components.md](./docs/components.md)
- Changelog: [packages/vue-win95/CHANGELOG.md](./packages/vue-win95/CHANGELOG.md)
