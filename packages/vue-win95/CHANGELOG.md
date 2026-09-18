# Changelog

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

### Docs site (`pnpm docs`)
- Welcome / Install / component category pages / Changelog & Sponsor
- Live demos via real library components
- Desktop shell: icons, Start menu, taskbar, draggable windows
- Larger readable typography

## 0.1.0

- Monorepo scaffold, Tailwind/shadcn pattern
- Button, Input, Checkbox, Window, Dialog
- a11y test baseline
