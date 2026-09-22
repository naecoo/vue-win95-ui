# TODO — vue-win95

> 状态：**代码侧 TODO 已清空**（v0.2.1）· **128 tests** · 不自动 npm publish

---

## 已完成

### 工程 / 发布门禁
- [x] monorepo · Tailwind preset · 字体 · LICENSE · CI · release:check · PUBLISH.md
- [x] GitHub `naecoo/vue-win95-ui` + repository 元数据
- [x] Changesets 配置（`.changeset/`）
- [x] GitHub Pages 工作流 `deploy-docs.yml`（在仓库 Settings→Pages 选 GitHub Actions 后生效）
- [x] Playwright 视觉冒烟脚本 `scripts/visual-smoke.mjs`（需本机 `playwright install`）
- [x] **npm publish 按要求暂缓**（见 `docs/PUBLISH.md`）

### 组件
- [x] 基础 / 容器 / 导航 / 浮层 / 数据 全套（含 Icon/Link/Skeleton/Popover/Upload/MessageBox/Notification/ContextMenu）
- [x] Menu **Submenu**
- [x] Window **ResizablePanel** + `useZIndex` / `useResize`
- [x] ComboBox **loading** + `search` 事件（远程搜索）
- [x] DatePicker **min/max** + 日历键盘（←→ 换月 / Esc）
- [x] Table **多选**（Ctrl）、**排序**、键盘、空态
- [x] Tabs **multirow**
- [x] Tree **typeahead** + ←→ 展开收起

### DX
- [x] `@win95/vue-resolver`（unplugin-vue-components）
- [x] 文档代码 **Copy**、Start **搜索**、hash 深链
- [x] **Theme Editor** 页（实时改 `--w95-*`）
- [x] 文档 Chrome **中/EN** 切换
- [x] `docs/A11Y.md` 读屏器清单 + 对比度备注
- [x] coverage 脚本（`test:coverage`）

### 质量
- [x] **128** Vitest + vitest-axe
- [x] typecheck / lib / docs-site / playground build 全绿

---

## 仅剩人工步骤

1. **npm publish**（你明确要求不自动执行）
   ```bash
   npm login
   npm view vue-win95 name version
   pnpm release:check
   pnpm --filter vue-win95 publish
   git tag v0.2.1 && git push origin v0.2.1
   ```
2. ~~GitHub Pages~~ **已启用并部署成功**：https://naecoo.github.io/vue-win95-ui/
3. 可选：`pnpm add -D @playwright/test && npx playwright install chromium` 后跑 `node scripts/visual-smoke.mjs`
4. 可选：发包后给 README 加 npm version 徽章

## 已知限制

- `vite-plugin-md` peer 声明 Vite 4，与 Vite 6 可用但有警告；若遇问题可迁移到 `@mdx-js/rollup`
- 标题栏浅蓝渐变端对比度偏低（Win95 复古取舍）

## 命令

```bash
pnpm test && pnpm typecheck && pnpm build
pnpm release:check
pnpm docs / pnpm dev / pnpm story
```
