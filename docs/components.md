# Component Catalog — vue-win95

All components ship keyboard support and ARIA following W3C APG where applicable.
Class prefix: `w95-*`. Theme tokens: CSS variables `--w95-*`.

Interactive docs: https://naecoo.github.io/vue-win95-ui/ (or `pnpm docs` locally).

## Install

```bash
pnpm add vue-win95-ui
```

```ts
// Global
import Win95 from "vue-win95";
import "vue-win95/styles.css";
app.use(Win95);

// On-demand
import { W95Button } from "vue-win95";
import "vue-win95/styles.css";
```

## Foundations

| Component | Import | Notes |
|-----------|--------|-------|
| Button | `W95Button` | Raised/sunken borders, `default` variant |
| Input | `W95Input` | Field border, label wiring |
| Checkbox | `W95Checkbox` | Native input + custom check |
| Radio / RadioGroup | `W95Radio`, `W95RadioGroup` | Fieldset/radiogroup |
| Select | `W95Select` | Native select skinned |
| Slider | `W95Slider` | Native range skinned |
| Switch | `W95Switch` | `role=switch` |
| Avatar | `W95Avatar` | Initials or image |
| Icon | `W95Icon` | Pixel glyph helper |
| Link | `W95Link` | Semantic anchor |
| Skeleton | `W95Skeleton` | Loading placeholder |
| Divider | `W95Divider` | `role=separator` |

## Containers

| Component | Import | Notes |
|-----------|--------|-------|
| Window | `W95Window` | Title bar, status slot |
| Dialog | `W95Dialog` | `alertdialog`, focus trap, Esc |
| Accordion | `W95Accordion`, `W95AccordionItem` | Disclosure |
| GroupBox | `W95GroupBox` | Fieldset + legend |
| FieldRow | `W95FieldRow` | Label/input row |
| StatusBar | `W95StatusBar`, `W95StatusBarField` | Window status strip |
| Popover | `W95Popover` | Anchored panel |
| ResizablePanel | `W95ResizablePanel` | Edge resize |

## Navigation

| Component | Import | Notes |
|-----------|--------|-------|
| Tabs | `W95Tabs`, `W95TabList`, `W95Tab`, `W95TabPanel` | Tablist keyboard |
| Menu | `W95MenuBar`, `W95MenuItem`, `W95MenuList`, `W95MenuSubmenu` | Menubar pattern |
| Toolbar | `W95Toolbar` | `role=toolbar` |
| Tree | `W95Tree`, `W95TreeItem` | Tree/treeitem |
| Splitter | `W95Splitter` | Separator resize |
| Breadcrumb | `W95Breadcrumb` | `aria-current` |
| Pagination | `W95Pagination` | Page controls |
| ContextMenu | `W95ContextMenu`, `W95ContextMenuArea` | Right-click menu |

## Overlays

| Component | Import | Notes |
|-----------|--------|-------|
| Tooltip | `W95Tooltip` | Delayed `role=tooltip` |
| Toast | `W95Toast` | Auto-dismiss |
| Dropdown | `W95Dropdown` | `aria-haspopup=menu` |
| ComboBox | `W95ComboBox` | Combobox/listbox + filter |
| Notification | `W95Notification` | Typed notices |

## Data

| Component | Import | Notes |
|-----------|--------|-------|
| Table | `W95Table` | Sort, multi-select, keyboard |
| SpinButton | `W95SpinButton` | `role=spinbutton` |
| DatePicker | `W95DatePicker` | Month calendar, min/max |
| ProgressBar | `W95ProgressBar` | `role=progressbar` |
| Upload | `W95Upload` | File list |

## Functions and composables

| Export | Notes |
|--------|-------|
| `W95Alert` / `W95Confirm` / `W95ShowMessageBox` | Promise dialogs |
| `useNotifier` / `notify` | Notification store |
| `useId` | SSR-safe ids |
| `useFocusTrap` | Modal focus |
| `useRovingFocus` | Arrow-key focus |
| `useZIndex` | Layer manager |
| `useResize` | Edge resize helper |
| `cn` | clsx + tailwind-merge |
