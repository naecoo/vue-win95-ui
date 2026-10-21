# TODO — vue-win95-ui

> 状态：**0.3.0 已就绪，仅剩人工发版** · 167 tests · 不自动 npm publish

---

## 本轮（0.3.0）已完成

### 工程链路
- [x] 包名统一 `vue-win95-ui`（根脚本 / playground / docs-site / resolver / changeset / 文档）
- [x] `styles.css` 去掉 Tailwind preflight；新增 `tokens.css`（纯变量）
- [x] `release:check` 重写：名字一致性、exports 可解析、产物无 preflight、CHANGELOG 对齐、changeset 包名
- [x] `prepublishOnly` 顺序修正（先 build 再 check）
- [x] CI 增加 build → release:check → exports 解析校验
- [x] 删除库 / 文档站 / playground 三份重复的 token 与组件 CSS 副本

### 缺陷修复
- [x] ContextMenu 菜单项点不动（pointerdown 抢先卸载面板）
- [x] Tabs 挂载抢焦点；Enter/Space 不能选中
- [x] Tree 无选中时键盘不可达
- [x] Input 聚焦样式引用不存在的 token
- [x] `.w95-tab--selected` 死规则
- [x] Dialog 卸载漏滚动锁 / 嵌套 Esc 冲突
- [x] MessageBox 假 ref、假的 `prompt` 类型
- [x] Switch 标签无效关联、Breadcrumb 忽略 `href`、SpinButton 不回写
- [x] Pagination 每页一个按钮

### 架构收口
- [x] 浮层内核 `useFloating` + `useDismiss` + `OverlayPanel`（7 个浮层共用）
- [x] 层级统一 `nextZIndex()`；删除无调用方的 `useResize` / `useZIndex()`
- [x] 类型化 context（`createContext`），去掉字符串 inject key 与三处重复 interface
- [x] props 类型改为 `InstanceType<typeof X>["$props"]`，删掉手写副本
- [x] `withInstall(comp, name)`：全局注册名与文档一致

### 能力补齐
- [x] `W95Desktop` / `W95Taskbar` / `W95TaskbarItem` + `W95Window` 拖动、双击最大化、层级、最小化
- [x] `W95MenuEntry`（菜单栏互斥展开、悬停切换、外部关闭）
- [x] `W95Textarea`、`W95Form` / `W95FormItem`（aria 自动接线）
- [x] 内置文案 i18n：`provideLocale` / `useLocale`，en + zh-CN
- [x] Table 单元格插槽、加载态、行 `aria-selected`
- [x] Tree 数据驱动 + 方向键；ComboBox `clearable`；DatePicker 今天/清除/首日；Pagination 省略号

### 质量
- [x] 交互级回归测试（167 tests）：pointerdown→click、焦点、滚动锁、拖动、菜单互斥、受控排序
- [x] 文档与库导出一致性测试（prop 写了不存在 / 组件没文档 → 红灯）
- [x] 文档站的窗口管理器改为使用库内组件

---

## 仅剩人工步骤

1. **npm publish**
   ```bash
   npm login
   pnpm release:check
   pnpm --filter vue-win95-ui publish
   git tag v0.3.0 && git push origin v0.3.0
   ```
2. 可选：`pnpm add -D @playwright/test && npx playwright install chromium` 后跑 `node scripts/visual-smoke.mjs`
3. 可选：给 docs-site / playground 补 tsconfig，把 `vue-tsc` 纳入 CI

## 已知限制

- 组件库仍依赖 Tailwind 生成的原子类；宿主若想用 `class` 覆盖，需要自己的 Tailwind 扫描组件源码
- `vite-plugin-md` peer 声明 Vite 4，与 Vite 6 可用但有警告
- 浅蓝渐变端的标题栏对比度偏低（Win95 复古取舍）
- Icon 仍是字形兜底，尚未提供像素图标集

## 命令

```bash
pnpm test && pnpm typecheck && pnpm build
pnpm release:check
pnpm docs / pnpm dev / pnpm story
```
