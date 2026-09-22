# Publish checklist — vue-win95

> Manual publish only. This repository never publishes automatically.

**Remote**: https://github.com/naecoo/vue-win95-ui.git

## One-time setup

1. GitHub remote: configured as `origin`
2. `repository` / `bugs` / `homepage` in `package.json`: filled in
3. Check npm name availability:

   ```bash
   npm view vue-win95 name version
   # If taken: rename (for example @win95/vue or vue-win95-ui) and update docs
   ```

4. Log in:

   ```bash
   npm login
   ```

## Every release

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm build
pnpm release:check
# After review (version and CHANGELOG):
pnpm --filter vue-win95 publish
```

## After publish

```bash
git tag v0.2.1
git push origin v0.2.1
npm view vue-win95
```

## Rollback

Do not `unpublish` unless absolutely required. Prefer a patch release with the fix.
