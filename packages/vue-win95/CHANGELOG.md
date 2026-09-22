# Changelog

## 0.2.1 — unreleased

### Added
- `W95Icon`, `W95Link`, `W95Skeleton`, `W95Popover`
- `W95Notification`（类型 info/success/warn/error + 图标）
- `W95ContextMenu` / `W95ContextMenuArea`（右键菜单）
- MessageBox 命令式 API：`W95Alert` / `W95Confirm` / `W95ShowMessageBox`
- `useNotifier()` / `notify()` 全局通知 store
- Dialog `size`（sm/md/lg），`width` 可覆盖
- DatePicker `min` / `max` 禁用范围外日期
- Table 列排序（`sortable` + `aria-sort`）、键盘导航、空态
- `vue-win95/tokens.css` exports 别名
- Docs-site：Start 菜单搜索、hash 深链、代码块 **Copy** 按钮
- 键盘导航与 extras 测试；`test:coverage` 脚本（122 tests）

### Housekeeping
- LICENSE / CI / prepublish-check / docs/PUBLISH.md
- repository 元数据 → github.com/naecoo/vue-win95-ui

## 0.2.0 — 2026-09-17

### Added
- **Foundation**: Button, Input, Checkbox, Radio/RadioGroup, Select, Slider, ProgressBar, GroupBox, FieldRow, Divider, StatusBar
- **Containers**: Window, Dialog (focus trap), Tabs, MenuBar/Menu, Toolbar, Tree, Splitter, Accordion
- **Overlays**: Tooltip, Toast, Dropdown, ComboBox
- **Data**: Table, SpinButton, DatePicker, Breadcrumb, Pagination, Switch, Avatar
- **Infra**: `@win95/tailwind-preset`, bundled Pixelated MS Sans Serif, `cn` helper
- **Composables**: `useId`, `useFocusTrap`, `useRovingFocus`
- **Docs**: Storybook stories, `docs/components.md`, Win95 desktop MDX site
- **Quality**: 104 Vitest + vitest-axe tests

### Theme
- CSS custom properties `--w95-*`
- Tailwind utilities `w95-*` (colors, shadows, sizes)
- Unified `.w95-focus` dotted focus ring
- Dialog default width 480

## 0.1.0

- Monorepo scaffold, Tailwind/shadcn pattern
- Button, Input, Checkbox, Window, Dialog
- a11y test baseline
