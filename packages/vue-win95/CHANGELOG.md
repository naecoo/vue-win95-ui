# Changelog

## 0.3.0

一次"从外观库到行为库"的重构：修掉了会真坏事的缺陷，把重复实现收进公共内核，并补齐了窗口、菜单、表单、语言与数据组件的能力。

### Breaking

- `withInstall` 必须显式给注册名；全局注册的标签名统一为 `W95Xxx`（此前是 `<Button>` / `<Window>`）
- 弹窗默认 `role="dialog"`，确认类改用 `role="alertdialog"`（`W95Dialog` 新增 `role` prop，MessageBox 走 alertdialog）
- `W95Dialog` 的 `okText` / `cancelText` 默认改为取 locale
- 删除 `useResize`（无真实调用方）与 `useZIndex()`；层级统一由 `nextZIndex()` 分配
- `ContextMenu` 的条目类型改名 `W95ContextMenuItem`，避免与新增的 `W95MenuEntry` 组件撞名
- `W95Table` 的 `sortBy` / `sortDir` 语义收敛为一对受控状态：传 `sortBy` 即为受控
- `W95Window` 新增浮动行为（`floating` / `draggable` / `x` / `y` / `minimized` / `maximized`）
- `W95Switch` 的标签移入按钮内部（此前 `<label for>` 指向 `<button>`，点了没反应）

### Fixed

- **`ContextMenu` 菜单项点不动**：document 上的捕获式 `pointerdown` 会在 `click` 之前把面板卸载
- **`Tabs` 挂载即抢焦点**：`TabList` 只同步 `tabindex`，不再 `.focus()`
- **`Tree` 无选中时无法用键盘进入**：首个节点现在可 Tab，并补上 ↑↓ Home End 与左右展开
- **`Popover` / `Tooltip` 多根节点**导致的属性透传失败
- `Input` 聚焦样式引用了不存在的 `shadow-w95-field-focus`，改为统一的 `w95-focus`
- `.w95-tab--selected` 与组件实际类名不一致（双横线规则从未生效）
- `Dialog` 打开状态下被卸载会永久锁死 `body.overflow`；嵌套弹窗的 Esc 现在只关最上层
- `MessageBox` 用普通对象冒充 ref，关闭动画永远是假的；`type: "prompt"` 从未实现，已从类型移除
- `Switch` 标签关联、`Breadcrumb` 忽略 `href`、`SpinButton` clamp 后输入框不回写
- `Pagination` 会为每一页渲染按钮（1000 页 = 1000 个按钮），改为省略号窗口

### Added

- `W95Desktop` / `W95Taskbar` / `W95TaskbarItem`：桌面 + 任务栏
- `W95Window`：标题栏拖动、双击最大化、层级提升、最小化状态
- `W95MenuEntry`：菜单栏顶层菜单（一次只展开一个、悬停切换、点外部关闭）
- `W95Textarea`
- `W95Form` / `W95FormItem`：标签、错误、`aria-invalid` / `aria-describedby` 自动接线
- 内置文案语言：`provideLocale` / `useLocale` / `locales`，`app.use(Win95, { locale: "zh-CN" })`
- `W95Table`：`#cell-<key>` 与 `#cell` 插槽、`loading`、行 `aria-selected`、`aria-activedescendant`
- `W95Tree`：`items` 数据驱动、`expanded`
- `W95ComboBox`：`clearable`、点外部关闭、Esc 收起
- `W95DatePicker`：今天 / 清除、`firstDayOfWeek`、点外部关闭、`aria-current`
- `W95Pagination`：`siblingCount`、`showTotal`
- 组件文档目录与库导出的一致性测试（文档写了不存在的 prop、组件没文档，都会让 CI 变红）
- 交互级回归测试（pointerdown→click 序列、焦点、滚动锁、拖动、菜单互斥）

### Engineering

- 包名统一为 `vue-win95-ui`：根脚本、playground / docs-site 依赖、resolver、changeset、文档全部对齐
- `styles.css` 不再包含 Tailwind preflight；新增 `tokens.css` 只含变量
- `exports` / `main` / `module` / `types` 全部指向真实产物，发布门禁会校验
- `release:check` 重写：名字一致性、exports 可解析、产物无 preflight、CHANGELOG 与版本对齐、changeset 包名有效
- `prepublishOnly` 改为先构建再检查（此前检查的是上一次的陈旧产物）
- 三份重复的 token / 组件 CSS 副本删除，文档站与 playground 改为消费库内样式
- 文档站的窗口管理器改用库里的 `W95Desktop` / `W95Window` / `W95Taskbar`

## 0.2.1 — 2026-09-23

### Added
- `W95Icon`, `W95Link`, `W95Skeleton`, `W95Popover`
- `W95Notification` (types: info / success / warn / error)
- `W95ContextMenu` / `W95ContextMenuArea`
- MessageBox API: `W95Alert` / `W95Confirm` / `W95ShowMessageBox`
- `useNotifier()` / `notify()` notification store
- Dialog `size` (`sm` / `md` / `lg`); `width` override
- DatePicker `min` / `max` disabled ranges and calendar keyboard
- Table column sort (`sortable` + `aria-sort`), multi-select, keyboard, empty state
- `W95MenuSubmenu`, `W95Upload`, `W95ResizablePanel`
- ComboBox `loading` + `search`; Tabs `multirow`
- Tree typeahead and Left/Right expand/collapse
- `@win95/vue-resolver` for unplugin-vue-components
- `vue-win95-ui/tokens.css` export alias
- Docs site: theme editor, zh/en i18n, copy buttons, search, hash deep links
- `docs/A11Y.md`, Changesets, deploy workflow, visual-smoke script

### Style
- Shared 60ms motion, hover press on buttons, field focus ring, switch slide

## 0.2.0 — 2026-09-17

首个公开版本：基础、容器、导航、浮层、数据组件与文档站。
