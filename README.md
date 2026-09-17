# vue-win95

Windows 95 style Vue 3 component library.

- **Stack**: Vue 3 · TypeScript · Tailwind CSS (shadcn pattern)
- **A11y**: WAI-ARIA APG patterns, semantic HTML, focus management
- **Theme**: CSS custom properties + shared Tailwind preset

## Quick start

```bash
pnpm add vue-win95
```

```ts
import { createApp } from "vue";
import App from "./App.vue";
// pick a theme CSS that includes tokens + Tailwind-generated utilities
import "vue-win95/styles.css";

const app = createApp(App);
```

When consuming from source / monorepo, point Tailwind at the package and use `@win95/tailwind-preset`.

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

`packages/docs-site` 是 **Win95 桌面壳文档站**：
- 桌面图标 + Start 菜单 + 任务栏 + 可拖拽窗口
- 文档页为 `.mdx`（Markdown + Vue），**内嵌真实的 vue-win95 组件演示**
- 扫描线 CRT 氛围、像素字体、双层 inset 边框

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | playground |
| `pnpm docs` | Win95 MDX 文档站 |
| `pnpm story` | Storybook |
| `pnpm test` | Vitest + axe |
| `pnpm build` | library build |

See [docs/components.md](./docs/components.md) for the component catalog.
