# Component Catalog — vue-win95-ui

按 W3C APG 提供键盘与 ARIA。类前缀 `w95-*`，主题令牌 `--w95-*`。

交互文档：https://naecoo.github.io/vue-win95-ui/ （或本地 `pnpm docs`）。

## Install

```bash
pnpm add vue-win95-ui
```

```ts
// 全局（可选传 locale 切换内置文案，默认 en）
import Win95 from "vue-win95-ui";
import "vue-win95-ui/styles.css";
app.use(Win95, { locale: "zh-CN" });

// 按需
import { W95Button } from "vue-win95-ui";
import "vue-win95-ui/styles.css";
```

样式有两个入口：

| 入口 | 内容 | 用途 |
|------|------|------|
| `vue-win95-ui/styles.css` | 令牌 + 组件样式（**不含** Tailwind preflight） | 默认 |
| `vue-win95-ui/tokens.css` | 只有 `--w95-*` CSS 变量 | 只想覆盖主题 |

## Foundations

| Component | Import | Notes |
|-----------|--------|-------|
| Button | `W95Button` | Raised/sunken borders, `default` variant |
| Input | `W95Input` | Field border, label wiring |
| Textarea | `W95Textarea` | 多行输入，带 `invalid` |
| Checkbox | `W95Checkbox` | Native input + custom check |
| Radio / RadioGroup | `W95Radio`, `W95RadioGroup` | Fieldset/radiogroup |
| Select | `W95Select` | Native select skinned |
| Slider | `W95Slider` | Native range skinned |
| Switch | `W95Switch` | `role=switch`，标签在按钮内 |
| Avatar | `W95Avatar` | Initials or image |
| Icon | `W95Icon` | Glyph helper |
| Link | `W95Link` | Semantic anchor |
| Skeleton | `W95Skeleton` | Loading placeholder |
| Divider | `W95Divider` | `role=separator` |

## Forms

| Component | Import | Notes |
|-----------|--------|-------|
| Form | `W95Form` | 标签宽度统一 + `submit` |
| FormItem | `W95FormItem` | 标签 / 错误 / 提示，自动 `aria-invalid` + `aria-describedby` |
| FieldRow | `W95FieldRow` | Label/input 行布局 |

## Containers

| Component | Import | Notes |
|-----------|--------|-------|
| Desktop | `W95Desktop` | 桌面容器，给浮动窗口定位与裁切 |
| Window | `W95Window` | 拖动、双击最大化、层级、最小化状态 |
| Taskbar | `W95Taskbar` | 任务栏容器 |
| TaskbarItem | `W95TaskbarItem` | 任务栏窗口按钮 |
| Dialog | `W95Dialog` | `dialog` / `alertdialog`、焦点陷阱、Esc 栈、滚动锁 |
| Accordion | `W95Accordion`, `W95AccordionItem` | Disclosure |
| GroupBox | `W95GroupBox` | Fieldset + legend |
| StatusBar | `W95StatusBar`, `W95StatusBarField` | Window status strip |
| ResizablePanel | `W95ResizablePanel` | Edge resize |

## Navigation

| Component | Import | Notes |
|-----------|--------|-------|
| Tabs | `W95Tabs`, `W95TabList`, `W95Tab`, `W95TabPanel` | Tablist 键盘，Enter/Space 选中 |
| MenuBar / MenuEntry | `W95MenuBar`, `W95MenuEntry` | 一次只展开一个、悬停切换、点外部关闭 |
| MenuItem / MenuList / MenuSubmenu | `W95MenuItem`, `W95MenuList`, `W95MenuSubmenu` | 菜单项与子菜单 |
| Toolbar | `W95Toolbar` | `role=toolbar` + roving tabindex |
| Tree | `W95Tree`, `W95TreeItem` | 手写或 `items` 数据驱动、方向键、typeahead |
| Splitter | `W95Splitter` | Separator resize |
| Breadcrumb | `W95Breadcrumb` | `aria-current`，有 `href` 时渲染链接 |
| Pagination | `W95Pagination` | 省略号窗口、`show-total` |
| ContextMenu | `W95ContextMenu`, `W95ContextMenuArea` | 右键菜单，自动贴边翻转 |

## Overlays

所有浮层共用同一套内核（定位翻转/夹缝、teleport、外部点击、Esc、层级分配）：

| Component | Import | Notes |
|-----------|--------|-------|
| Tooltip | `W95Tooltip` | Delayed `role=tooltip` |
| Toast | `W95Toast` | Auto-dismiss |
| Dropdown | `W95Dropdown` | `aria-haspopup=menu` |
| ComboBox | `W95ComboBox` | 过滤、`clearable`、点外部关闭 |
| Notification | `W95Notification` | Typed notices |
| Popover | `W95Popover` | Anchored panel |

## Data

| Component | Import | Notes |
|-----------|--------|-------|
| Table | `W95Table` | 单元格插槽 `#cell-<key>` / `#cell`、排序、多选、加载态、`aria-sort`/`aria-selected` |
| SpinButton | `W95SpinButton` | `role=spinbutton`，clamp 后回写 |
| DatePicker | `W95DatePicker` | 月历、min/max、今天/清除、首日可配 |
| ProgressBar | `W95ProgressBar` | `role=progressbar` |
| Upload | `W95Upload` | File list |

## Functions, composables and locale

| Export | Notes |
|--------|-------|
| `W95Alert` / `W95Confirm` / `W95ShowMessageBox` | Promise 弹窗（`alertdialog`） |
| `provideLocale` / `useLocale` / `locales` | 内置文案语言（en / zh-CN） |
| `useId` | 稳定 id |
| `useFocusTrap` | Modal focus |
| `useRovingFocus` | Arrow-key focus |
| `useFloating` / `useDismiss` | 浮层定位与关闭策略 |
| `useControllable` | 受控 / 非受控统一 |
| `nextZIndex` | 浮层层级分配 |
| `cn` | clsx + tailwind-merge |

## 主题

```css
:root {
  --w95-surface: #c0c0c0;
  --w95-dialog-blue: #000080;
  --w95-text: #222222;
  --w95-error: #a4262c;
}
```
