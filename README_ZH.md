# vue-win95

[![CI](https://github.com/naecoo/vue-win95-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/naecoo/vue-win95-ui/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://naecoo.github.io/vue-win95-ui/)

[English](./README.md) | **中文**

Windows 95 风格的 Vue 3 组件库。

- **仓库**：[github.com/naecoo/vue-win95-ui](https://github.com/naecoo/vue-win95-ui)
- **在线文档**：[naecoo.github.io/vue-win95-ui](https://naecoo.github.io/vue-win95-ui/)
- **技术栈**：Vue 3 · TypeScript · Tailwind CSS（shadcn 模式）
- **无障碍**：WAI-ARIA APG、语义 HTML、焦点管理
- **主题**：CSS 变量 + 共享 Tailwind preset

## 安装

```bash
pnpm add vue-win95
# 或 npm i vue-win95
```

### 全局注册

```ts
import { createApp } from "vue";
import Win95 from "vue-win95";
import "vue-win95/styles.css";

createApp(App).use(Win95).mount("#app");
```

### 按需引入

```ts
import { W95Button, W95Window } from "vue-win95";
import "vue-win95/styles.css";
```

Tailwind preset 用法见文档站 **Install** 页。

## 主题

```css
:root {
  --w95-surface: #c0c0c0;
  --w95-dialog-blue: #000080;
  --w95-text: #222222;
}
```

## 文档站（Win95 桌面）

```bash
pnpm docs        # http://localhost:5174/vue-win95-ui/
pnpm docs:build
```

| 入口 | 内容 |
|------|------|
| Welcome | 组件库介绍与技术栈 |
| Install | 全局 / 按需 / Tailwind preset |
| All Components | 全部导出组件，点击卡片弹出 Props / Events / Slots |
| Theme Editor | 实时调节 `--w95-*` |
| Changelog & Sponsor | 版本与链接 |
| 计算器 / 记事本 / 扫雷 | 用组件库实现的小应用 |

文档站为 Win95 桌面壳（图标、开始菜单、任务栏、可拖拽窗口），支持中/英切换。

## 脚本

| 命令 | 说明 |
|---------|-------------|
| `pnpm dev` | playground |
| `pnpm docs` | Win95 MDX 文档站 |
| `pnpm test` | Vitest + axe |
| `pnpm build` | 库构建 |
| `pnpm release:check` | 发布前检查 |

- 组件目录：[docs/components.md](./docs/components.md)
- 无障碍说明：[docs/A11Y.md](./docs/A11Y.md)
- 更新日志：[packages/vue-win95/CHANGELOG.md](./packages/vue-win95/CHANGELOG.md)
- 发布指南：[docs/PUBLISH.md](./docs/PUBLISH.md)
