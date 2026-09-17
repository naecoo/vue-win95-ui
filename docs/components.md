# Component Catalog — vue-win95

All components ship keyboard support and ARIA following W3C APG where applicable.
Class prefix: `w95-*`. Theme tokens: CSS variables `--w95-*`.

## Foundations

| Component | Import | Notes |
|-----------|--------|-------|
| Button | `W95Button` | raised/sunken borders, `default` variant |
| Input | `W95Input` | field border, label wiring |
| Checkbox | `W95Checkbox` | native input + custom check |
| Radio / RadioGroup | `W95Radio`, `W95RadioGroup` | fieldset/radiogroup, inject context |
| Select | `W95Select` | native select skinned |
| Slider | `W95Slider` | native range skinned |
| ProgressBar | `W95ProgressBar` | `role=progressbar`, segmented mode |
| GroupBox | `W95GroupBox` | fieldset + legend |
| FieldRow | `W95FieldRow` | label/input row layout |
| Divider | `W95Divider` | `role=separator` |
| StatusBar / Field | `W95StatusBar`, `W95StatusBarField` | window status strip |

## Containers

| Component | Import | Notes |
|-----------|--------|-------|
| Window | `W95Window` | title bar glyphs, status slot |
| Dialog | `W95Dialog` | `alertdialog`, focus trap, Esc |
| Tabs | `W95Tabs`, `W95TabList`, `W95Tab`, `W95TabPanel` | tablist keyboard |
| MenuBar / Menu | `W95MenuBar`, `W95MenuItem`, `W95MenuList` | menubar pattern |
| Toolbar | `W95Toolbar` | `role=toolbar` |
| Tree | `W95Tree`, `W95TreeItem` | tree/treeitem, expand |
| Splitter | `W95Splitter` | separator drag/keyboard resize |
| Accordion | `W95Accordion`, `W95AccordionItem` | disclosure |

## Overlays

| Component | Import | Notes |
|-----------|--------|-------|
| Tooltip | `W95Tooltip` | delayed, `role=tooltip` |
| Toast | `W95Toast` | portal, auto-dismiss, `aria-live` |
| Dropdown | `W95Dropdown` | `aria-haspopup=menu`, focus return |
| ComboBox | `W95ComboBox` | combobox/listbox + filter |

## Data & Misc

| Component | Import | Notes |
|-----------|--------|-------|
| Table | `W95Table` | selectable rows, sticky header |
| SpinButton | `W95SpinButton` | `role=spinbutton` |
| DatePicker | `W95DatePicker` | month calendar, ISO date |
| Breadcrumb | `W95Breadcrumb` | nav + aria-current |
| Pagination | `W95Pagination` | page buttons + aria-current |
| Switch | `W95Switch` | `role=switch` |
| Avatar | `W95Avatar` | initials or image |

## Composables

- `useId` — SSR-safe unique ids
- `useFocusTrap` — Tab cycling + focus restore
- `useRovingFocus` — Arrow/Home/End + roving tabindex
- `cn` — clsx + tailwind-merge

## Stories

Launch Storybook (`pnpm story`) for live examples under:
- Components/* · Navigation/* · Overlays/* · Data/* · Misc/*
