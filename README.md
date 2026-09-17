# vue-win95

Windows 95 style Vue 3 component library with Tailwind CSS (shadcn pattern) and first-class accessibility.

## Stack

- Vue 3 + TypeScript
- Tailwind CSS + CSS custom properties (shadcn-style theming)
- Storybook for docs / visual QA
- Vitest + vitest-axe for unit & a11y tests
- pnpm monorepo

## Packages

- `packages/vue-win95` — the component library
- `playground` — local demo app

## Getting Started

```bash
pnpm install
pnpm dev          # playground
pnpm story        # Storybook
pnpm test         # unit + a11y tests
pnpm build        # library build
```

## Components (Phase 1)

- Button
- Input
- Checkbox
- Window
- Dialog

## Theming

Override CSS variables on `:root`:

```css
:root {
  --w95-surface: #c0c0c0;
  --w95-dialog-blue: #000080;
  /* ... */
}
```
