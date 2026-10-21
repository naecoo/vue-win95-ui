#!/usr/bin/env node
/**
 * 发布门禁（不执行 publish）。
 * 目标不是"文件存在"，而是"发布出去的东西能装、能解析、不会污染宿主"。
 * 用法：node scripts/prepublish-check.mjs
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (p) => JSON.parse(readFileSync(resolve(root, p), "utf8"));

const libPkgPath = "packages/vue-win95/package.json";
const libPkg = readJson(libPkgPath);
const rootPkg = readJson("package.json");
const libDir = resolve(root, "packages/vue-win95");
const dist = (f) => resolve(libDir, "dist", f);

const checks = [];
function check(ok, label, hint = "") {
  checks.push({ ok, label, hint });
}

// —— 1. 名字一致性：这次改名漏改就是因为没人校验这条 ——
check(Boolean(libPkg.name), "library package.json has a name");
check(
  !libPkg.name?.includes(" "),
  `library name is a valid npm name (${libPkg.name})`
);

const filteredScripts = Object.entries(rootPkg.scripts ?? {}).filter(([, cmd]) =>
  /--filter\s+(\S+)/.test(cmd)
);
const badFilters = filteredScripts
  .map(([key, cmd]) => [key, cmd.match(/--filter\s+(\S+)/)[1]])
  .filter(([, name]) => {
    if (["playground", "docs-site"].includes(name)) return false;
    return name !== libPkg.name;
  });
check(
  badFilters.length === 0,
  `root scripts --filter match a real package (${libPkg.name})`,
  badFilters.length
    ? `mismatched: ${badFilters.map(([k, n]) => `${k}→${n}`).join(", ")}`
    : ""
);

const workspaceDeps = ["playground/package.json", "packages/docs-site/package.json"];
const staleWorkspaceNames = workspaceDeps.flatMap((file) => {
  const pkg = readJson(file);
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  return Object.entries(deps)
    .filter(([, v]) => v.startsWith("workspace:"))
    .map(([name]) => name)
    .filter((name) =>
      ["playground", "docs-site", "@win95/tailwind-preset", "@win95/vue-resolver"].includes(name)
        ? false
        : name !== libPkg.name
    )
    .map((name) => `${file} → ${name}`);
});
check(
  staleWorkspaceNames.length === 0,
  "workspace:* deps point at the library's real name",
  staleWorkspaceNames.join(", ")
);

const resolverSource = readFileSync(
  resolve(root, "packages/resolver/src/index.ts"),
  "utf8"
);
check(
  resolverSource.includes(`from: "${libPkg.name}"`),
  "resolver imports the library by its real name"
);

// —— 2. 产物与 exports 对得上 ——
check(existsSync(dist("index.js")), "dist/index.js built", "pnpm build");
check(existsSync(dist("index.cjs")), "dist/index.cjs built", "pnpm build");
check(existsSync(dist("index.d.ts")), "dist/index.d.ts built", "pnpm build");
check(existsSync(dist("styles.css")), "dist/styles.css built", "pnpm build");
check(existsSync(dist("tokens.css")), "dist/tokens.css built", "pnpm build");

const exportTargets = Object.entries(libPkg.exports ?? {}).flatMap(([key, value]) =>
  typeof value === "string"
    ? [[key, value]]
    : Object.entries(value).map(([cond, file]) => [`${key} (${cond})`, file])
);
const missingExports = exportTargets.filter(
  ([, file]) => !existsSync(resolve(libDir, file))
);
check(
  missingExports.length === 0,
  "every exports target exists on disk",
  missingExports.map(([k, f]) => `${k} → ${f}`).join(", ")
);
for (const field of ["main", "module", "types"]) {
  const file = libPkg[field];
  check(
    !file || existsSync(resolve(libDir, file)),
    `package.json ${field} resolves (${file})`
  );
}
check(
  Boolean(libPkg.files?.includes("dist")),
  "files includes dist"
);

// —— 3. 产物不污染宿主：组件库不应携带 Tailwind preflight ——
if (existsSync(dist("styles.css"))) {
  const css = readFileSync(dist("styles.css"), "utf8");
  check(
    !css.includes("--tw-border-spacing-x") && !css.includes("-webkit-text-size-adjust"),
    "dist/styles.css carries no Tailwind preflight",
    "styles.css 里不要写 @tailwind base"
  );
  check(
    css.includes("--w95-surface"),
    "dist/styles.css carries design tokens"
  );
}

// —— 4. 版本与变更记录一致 ——
check(libPkg.license === "MIT", "package.json license = MIT");
check(
  existsSync(resolve(root, "LICENSE")) &&
    existsSync(resolve(libDir, "LICENSE")),
  "LICENSE present at root and in package"
);
check(Boolean(libPkg.repository), "package.json repository field");
check(
  libPkg.peerDependencies?.vue?.startsWith("^3"),
  "peerDependency vue ^3"
);

const changelogPath = resolve(libDir, "CHANGELOG.md");
if (existsSync(changelogPath)) {
  const changelog = readFileSync(changelogPath, "utf8");
  const heading = changelog.match(/^##\s+([0-9][^\s—–-]*)/m)?.[1];
  check(
    heading === libPkg.version,
    `CHANGELOG top entry matches version (${libPkg.version})`,
    `CHANGELOG 顶部是 ${heading ?? "无"}`
  );
}

const changesetDir = resolve(root, ".changeset");
const changesetFixes = readdirSync(changesetDir)
  .filter((f) => f.endsWith(".md"))
  .flatMap((f) => {
    const body = readFileSync(resolve(changesetDir, f), "utf8");
    const frontmatter = body.split("---")[1] ?? "";
    return frontmatter
      .split("\n")
      .map((line) => line.match(/^"([^"]+)":/)?.[1])
      .filter(Boolean)
      .filter((name) => {
        const known = [
          libPkg.name,
          "playground",
          "docs-site",
          "@win95/tailwind-preset",
          "@win95/vue-resolver",
        ];
        return !known.includes(name);
      })
      .map((name) => `${f} → ${name}`);
  });
check(
  changesetFixes.length === 0,
  "changesets reference existing packages",
  changesetFixes.join(", ")
);

check(
  !libPkg.version.includes("beta") || process.env.ALLOW_BETA === "1",
  `version ${libPkg.version} is publishable`,
  "预发布版本需要显式 ALLOW_BETA=1 pnpm publish"
);

let failed = 0;
for (const c of checks) {
  const mark = c.ok ? "OK " : "FAIL";
  if (!c.ok) failed += 1;
  console.log(`[${mark}] ${c.label}${c.ok || !c.hint ? "" : `  → ${c.hint}`}`);
}

if (failed > 0) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}
console.log("\nAll pre-publish checks passed. You may run publish manually.");
