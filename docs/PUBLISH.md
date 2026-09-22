# Publish checklist — vue-win95

> 实际执行 `publish` 前请人工确认。本仓库**不会自动发布**。

**Remote**: https://github.com/naecoo/vue-win95-ui.git

## 一次性准备

1. ~~GitHub 远程仓库~~ **已配置** `origin`
2. ~~package.json repository 字段~~ **已填写**
3. **npm 包名可用性**
   ```bash
   npm view vue-win95 name version 2>&1
   # 若被占用：改名例如 @win95/vue 或 vue-win95-ui，同步 README/文档
   ```
4. 登录
   ```bash
   npm login
   ```

## 每次发布

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm build
pnpm release:check
# 通过后（人工确认版本号与 CHANGELOG）：
cd packages/vue-win95 && pnpm publish
# 或
pnpm --filter vue-win95 publish
```

## 发布后

```bash
git tag v0.2.0
git push origin v0.2.0
# 验证
npm view vue-win95
```

## 回滚（unpublish 有时间限制，优先发补丁版本）

```bash
# 不推荐 unpublish；出问题发 0.2.1 修复
```
