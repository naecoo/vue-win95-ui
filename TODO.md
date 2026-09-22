# TODO — vue-win95

> 更新时间：v0.2.1 开发中（不发布）· 测试 **122 passed**  
> 约定：`[x]` 已完成 · `[ ]` 未做（保留为后续增强）

---

## 已完成

### 工程 / 发布门禁
- [x] pnpm monorepo · Tailwind preset · 像素字体 · `cn()`
- [x] MIT LICENSE · CI · `pnpm release:check` · `docs/PUBLISH.md`
- [x] GitHub remote `naecoo/vue-win95-ui` + repository 元数据
- [x] `npm pack` / `release:check` 通过（**按要求不执行 publish**）

### 组件（约 40+）
- [x] 基础：Button, Input, Checkbox, Radio/Group, Select, Slider, Switch, Avatar, Divider, Icon, Link, Skeleton
- [x] 容器：Window, Dialog(`size`), GroupBox, Accordion, StatusBar, FieldRow, Popover
- [x] 导航：Tabs, MenuBar/Menu, Toolbar, Tree, Splitter, Breadcrumb, Pagination
- [x] 浮层：Tooltip, Toast, Dropdown, ComboBox
- [x] 数据：Table(键盘+空态), SpinButton, DatePicker, ProgressBar
- [x] 反馈：Notification（info/success/warn/error）、MessageBox（`W95Alert`/`W95Confirm`）

### Composables
- [x] `useId` · `useFocusTrap` · `useRovingFocus`

### 质量
- [x] 117 Vitest + vitest-axe（含键盘导航与 extras 组件）
- [x] typecheck / lib build / docs-site build / playground build

### 文档
- [x] Win95 桌面 MDX 站：Welcome · Install · 各分类 API · Gallery · Changelog
- [x] Start 菜单搜索 · hash 深链（`#button` 等）
- [x] `docs/components.md` · `docs/PUBLISH.md` · `CHANGELOG.md` 0.2.1

---

## 后续增强（未做，按需排期）

### 组件深度
- [ ] Menu 子菜单 + 视口 flip 定位
- [x] ContextMenu（`W95ContextMenu` / `W95ContextMenuArea`）
- [ ] ComboBox loading / 远程搜索 slot
- [x] DatePicker：min/max 禁用范围（完整日历键盘仍可选）
- [x] Table：列排序（`sortable`）；[ ] 多选、列宽拖拽
- [ ] Tabs 多行样式
- [ ] Tree：typeahead、完整 ←→ 展开收起
- [x] Toast/Notification：`useNotifier` / `notify()` 命令式 store
- [ ] Window 边缘 resize、`useZIndex` 窗口管理
- [ ] Upload / FileList

### a11y 深化
- [ ] 真实读屏器手测清单（NVDA / VoiceOver）
- [ ] 对比度审计报告
- [ ] Playwright 视觉回归 / Storybook 截图

### DX
- [ ] `unplugin-vue-components` resolver（`W95*` 自动导入）
- [x] 文档「复制代码」按钮（Copy / Copied）
- [ ] 主题编辑器（实时调 `--w95-*`）
- [ ] 文档 i18n（en / zh）
- [ ] vite-plugin-md 与 Vite 6 peer 升级或换 MDX 方案

### 工程
- [x] vitest coverage 配置（`pnpm --filter vue-win95 test:coverage`）
- [ ] Changesets 发版自动化（**publish 仍人工**）
- [ ] docs / playground 部署（GitHub Pages）
- [ ] 发布 npm（**明确暂缓**，见 `docs/PUBLISH.md`）
- [ ] npm version 徽章（发包后）

---

## 命令速查

```bash
pnpm test           # 117 tests
pnpm typecheck
pnpm build          # library
pnpm release:check  # 发布前门禁（不 publish）
pnpm dev            # playground :5173
pnpm docs           # docs-site :5174
pnpm story          # storybook :6006
```

## 约定

- 新组件：`packages/vue-win95/src/components/<name>/` + `components/index.ts` 导出 + 测试
- 文档页：`packages/docs-site/src/mdx/*.mdx` + `App.vue` 的 `pages` 注册
- 颜色/间距改 `@win95/tailwind-preset` 与 `styles.css` 的 `--w95-*`
