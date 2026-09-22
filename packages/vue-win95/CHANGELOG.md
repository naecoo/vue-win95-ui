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
- Table 列排序（`sortable` + `aria-sort`）、多选（Ctrl）、键盘导航、空态
- Menu 子菜单 `W95MenuSubmenu`；`W95Upload`；`W95ResizablePanel`
- ComboBox `loading` + `search`；DatePicker 日历键盘；Tabs `multirow`
- Tree typeahead + ←→ 展开；`useZIndex` / `useResize`
- `@win95/vue-resolver`（unplugin-vue-components）
- Docs：Theme Editor、中/EN 切换、Copy、搜索、hash 深链
- `docs/A11Y.md`；Changesets；Deploy Docs workflow；visual-smoke 脚本
- 键盘导航与 extras 测试；`test:coverage` 脚本（128 tests）

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
