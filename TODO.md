# TODO — vue-win95

> 更新时间：阶段 1–5 组件 + Win95 MDX 文档站完成之后（库 `v0.2.0`，测试 104 passed）  
> 约定：`[ ]` 未开始 · `[~]` 进行中 · `[x]` 已完成

---

## 已完成（摘要）

- [x] pnpm monorepo：`packages/vue-win95` · `tailwind-preset` · `docs-site` · `playground`
- [x] Tailwind/shadcn 模式：`cn()` · `--w95-*` tokens · shared preset
- [x] 像素字体内置（Pixelated MS Sans Serif woff2 → `styles.css`）
- [x] 组件约 35 个（基础 / 容器 / 导航 / 浮层 / 数据 / misc）
- [x] Composables：`useId` · `useFocusTrap` · `useRovingFocus`
- [x] Vitest + vitest-axe：**104** 用例
- [x] Storybook stories
- [x] Playground 演示
- [x] Win95 桌面 MDX 文档站（图标 / Start / 任务栏 / 可拖拽窗口）
- [x] 文档页：Welcome · Install · Button · Form · Window · Navigation · Overlays · Data · Misc · Gallery · Changelog
- [x] 各分类页 Props/Events/Slots API 表 + live demo
- [x] `npm pack` 验证（`vue-win95@0.2.0`，字体已内联）
- [x] Dialog 可关闭 / 文档内容加载修复

---

## P0 — 发布与质量门禁

- [ ] **确认 npm 包名**是否被占用（`vue-win95` 或改为 scope `@you/vue-win95`）
- [ ] **LICENSE** 文件（MIT）写入仓库与 `packages/vue-win95`
- [ ] **GitHub 仓库信息**：`repository` / `bugs` / `homepage` 写入 package.json
- [ ] **CI**：GitHub Actions — install → typecheck → test → build（docs + lib）
- [ ] **发布流程**：`pnpm publish --access public`（tag `v0.2.0`）；或先发 `0.2.0-beta`
- [ ] **CHANGELOG** 与 git tag 对齐
- [ ] **README** 徽章：npm version / CI / license

---

## P1 — 组件能力补强

### 交互完善
- [ ] **Dropdown / Menu**：子菜单（submenu）+ 定位（避免视口溢出）
- [ ] **ContextMenu**：右键菜单组件（复用 Menu + 定位）
- [ ] **ComboBox**：远程搜索 slot / loading 态
- [ ] **DatePicker**：禁用日期、min/max、键盘日历导航（APG datepicker）
- [ ] **Table**：排序、多选、空态、键盘行导航
- [ ] **Tabs**：多行 tabs、受控 active 指示条像素对齐
- [ ] **Tree**：完整键盘导航（↑↓←→、typeahead）、虚拟滚动（大数据）
- [ ] **Toast**：队列、类型（info/warn/error）、位置配置
- [ ] **Dialog**：`size` 预设、draggable、maximize 还原
- [ ] **Window**：可拖拽边缘 resize、z-index 管理器 hook

### 缺失组件（可选）
- [ ] Message / MessageBox（`alert`/`confirm` Promise API）
- [ ] Notification（与 Toast 区分：右下角堆叠）
- [ ] Popover（通用浮层）
- [ ] Tooltip 裁剪修复（overflow 容器内 flip）
- [ ] Upload / FileList
- [ ] Skeleton / Loading
- [ ] Icon 组件 + 像素图标 sprite（16×16）
- [ ] Link / Typography

---

## P2 — 无障碍与测试

- [ ] **键盘遍历套件**：Tabs / Menu / Tree / Dialog / Combobox 补全用例
- [ ] **焦点可见性**：统一 `.w95-focus` 在所有交互控件上（抽查 Button/Input/Menu/Tree）
- [ ] **对比度校验**：标题栏白字/蓝底、禁用态、选中行
- [ ] **屏幕阅读器手测清单**：NVDA / VoiceOver 关键路径（Dialog、Combobox、Table）
- [ ] **axe 全量 CI**：每个 story/demo 页面跑 axe
- [ ] **SSR 冒烟**：Nuxt/Vite SSR 下挂载无 `window` 报错
- [ ] **视觉回归**（可选）：Playwright + Storybook snapshot

---

## P3 — 文档站与 DX

- [ ] **vite-plugin-md** 与 Vite 6 peer 警告：升级插件或迁移到官方 MDX/Vue 方案
- [ ] 文档站 **搜索**（组件名 / Prop 名）
- [ ] 文档站 **深链**（hash 路由打开指定窗口页）
- [ ] 每页 **复制代码** 按钮
- [ ] **Playground** 同步全部新组件与文档演示
- [ ] **Storybook** 主题：manager 也做成 Win95 风格（可选）
- [ ] **unplugin-vue-components** 官方 resolver 包（`W95*` 自动导入）
- [ ] **主题编辑器**：文档站内调 `--w95-*` 实时预览
- [ ] **i18n** 文档（en-US / zh-CN 切换）
- [ ] CONTRIBUTING.md · CODE_OF_CONDUCT.md · Issue/PR 模板

---

## P4 — 视觉精调（像素级）

- [ ] Tabs 与 panel 接缝：选中态底部与边框完全对齐
- [ ] Tree 虚线：末项遮罩、缩进与 98.css 对照
- [ ] Title bar 控制按钮：16×14 图标与禁用态 maximize
- [ ] Scrollbar 皮肤（webkit）Win95 风格（可选全局）
- [ ] Focus ring 在深色选中背景上的可见性
- [ ] 字体渲染：关闭 font-smoothing 的跨浏览器一致性
- [ ] Dialog / Window 阴影与 `border-image` GroupBox 还原度

---

## P5 — 工程与性能

- [ ] **包体积**：检查 `dist` 是否 tree-shake；styles.css 是否可拆（tokens vs utilities）
- [ ] **exports** 子路径：`vue-win95/tokens` / 按需 CSS
- [ ] **VueUse** 等依赖评估：能自研则保持零依赖（当前 peer 仅 vue）
- [ ] **vitest** 覆盖率报告 + 阈值
- [ ] **Changesets** 或 standard-version 自动化版本
- [ ] **Playground / docs** 部署：GitHub Pages / Netlify
- [ ] **浏览器矩阵**：Chrome / Firefox / Safari 手动冒烟清单

---

## 建议执行顺序

1. **P0 发布门禁**（LICENSE → CI → npm 名 → publish）
2. **P2 键盘/a11y 缺口**（发布前必须扎实）
3. **P1 高频组件补强**（Dialog resize、Table、Menu submenu）
4. **P3 DX**（MDX 工具链、搜索、resolver）
5. **P4/P5** 按需打磨

---

## 命令速查

```bash
pnpm install
pnpm test           # vitest + axe
pnpm typecheck
pnpm build          # library
pnpm dev            # playground :5173
pnpm docs           # docs-site :5174
pnpm story          # storybook :6006
```

---

## 备注

- 文档站在 `packages/docs-site`，页面源文件：`src/mdx/*.mdx`，在 `src/App.vue` 的 `pages` 表注册。
- 新组件目录：`packages/vue-win95/src/components/<name>/`，并在 `components/index.ts` 导出。
- 样式 token 优先改 `@win95/tailwind-preset` 与 `styles.css` 的 `--w95-*`，避免组件内写死颜色。
