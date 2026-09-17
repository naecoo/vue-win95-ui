# vue-win95 Docs Site

Win95 桌面风格的 **MDX 文档站**，用组件库自己的 UI 搭建。

## 特色

| 元素 | 实现 |
|------|------|
| 桌面 | 青绿 `#008080` + CRT 扫描线 |
| 桌面图标 | CSS 像素图标，点击打开文档窗口 |
| Start 菜单 | 左侧竖排 banner + 组件列表 |
| 任务栏 | Start 按钮、窗口任务条、时钟 |
| 窗口 | 可拖拽标题栏、最小化/关闭、状态栏 |
| 文档内容 | `.mdx`（Markdown + Vue），实时渲染 `vue-win95` 组件 |

## 运行

```bash
pnpm docs
# → http://localhost:5174
```

## 新增页面

1. 在 `src/mdx/` 新建 `xxx.mdx`（可含 `<script setup>` + 组件）
2. 在 `src/App.vue` 的 `pages` 表里注册 title / icon / `import()`
