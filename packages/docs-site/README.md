# docs-site

Win95 desktop-style **MDX documentation site**, built with the vue-win95 library itself.

## Features

| Element | Implementation |
|------|------|
| Desktop | Teal `#008080` with CRT scanlines |
| Desktop icons | Pixel CSS icons open doc windows |
| Start menu | Side banner and searchable list |
| Taskbar | Start, window buttons, clock |
| Windows | Draggable title bar, minimize/close, status bar |
| Docs | MDX pages with live `vue-win95` demos |
| i18n | Chinese / English toggle and browser language detection |
| Mini apps | Calculator, Notepad, Minesweeper |

## Run

```bash
pnpm docs
# http://localhost:5174/vue-win95-ui/
```

## Add a page

1. Add `src/mdx/xxx.mdx` (use `isZh` from `../i18n` for bilingual blocks).
2. Register it in `src/App.vue` (`docPages`) and `src/i18n.ts` (`pages`).
