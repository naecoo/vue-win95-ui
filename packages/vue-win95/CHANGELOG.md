# Changelog

## 0.2.1 — unreleased

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
- `useZIndex` / `useResize`
- `@win95/vue-resolver` for unplugin-vue-components
- `vue-win95/tokens.css` export alias
- Docs site: theme editor, zh/en i18n, copy buttons, search, hash deep links
- `docs/A11Y.md`, Changesets, deploy workflow, visual-smoke script

### Style
- Shared 60ms motion, hover press on buttons, field focus ring, switch slide

### Housekeeping
- MIT license, CI, `release:check`, `docs/PUBLISH.md`
- Repository metadata for `naecoo/vue-win95-ui`

## 0.2.0 — 2026-09-17

### Added
- Foundation: Button, Input, Checkbox, Radio/RadioGroup, Select, Slider, ProgressBar, GroupBox, FieldRow, Divider, StatusBar
- Containers: Window, Dialog (focus trap), Tabs, MenuBar/Menu, Toolbar, Tree, Splitter, Accordion
- Overlays: Tooltip, Toast, Dropdown, ComboBox
- Data: Table, SpinButton, DatePicker, Breadcrumb, Pagination, Switch, Avatar
- Infra: `@win95/tailwind-preset`, bundled Pixelated MS Sans Serif, `cn` helper
- Composables: `useId`, `useFocusTrap`, `useRovingFocus`
- Docs: component catalog, Win95 desktop MDX site
- Quality: Vitest + vitest-axe baseline

### Theme
- CSS custom properties `--w95-*`
- Tailwind utilities `w95-*`
- Unified `.w95-focus` dotted focus ring

## 0.1.0

- Monorepo scaffold, Tailwind/shadcn pattern
- Button, Input, Checkbox, Window, Dialog
- Accessibility test baseline
