# vue-win95

[![CI](https://github.com/naecoo/vue-win95-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/naecoo/vue-win95-ui/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://naecoo.github.io/vue-win95-ui/)

Windows 95 风格的 Vue 3 组件库。

- **仓库**：https://github.com/naecoo/vue-win95-ui
- **在线文档**：https://naecoo.github.io/vue-win95-ui/
- **技术栈**：Vue 3、TypeScript、Tailwind CSS（shadcn 模式）
- **无障碍**：WAI-ARIA APG、语义化 HTML、焦点管理
- **主题**：CSS 变量与共享 Tailwind 预设

## 安装

```bash
pnpm add vue-win95
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

Tailwind 预设用法见文档站「安装」页。

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
| 欢迎 | 组件库介绍与技术栈 |
| 安装 | 全局、按需、Tailwind 预设 |
| 全部组件 | 点击卡片查看属性、事件、插槽 |
| 主题编辑器 | 实时调节主题变量 |
| 更新日志 | 版本与链接 |
| 计算器、记事本、扫雷 | 用组件库实现的小应用 |

## 脚本

| 命令 | 说明 |
|---------|-------------|
| `pnpm dev` | 本地演示 |
| `pnpm docs` | 文档站 |
| `pnpm test` | 单元测试与无障碍扫描 |
| `pnpm build` | 构建组件库 |
| `pnpm release:check` | 发布前检查 |

更多资料（英文文档）：

- [组件目录](./docs/components.md)
- [无障碍说明](./docs/A11Y.md)
- [更新日志](./packages/vue-win95/CHANGELOG.md)
- [发布指南](./docs/PUBLISH.md)
