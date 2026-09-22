#!/usr/bin/env node
/**
 * Pre-publish checklist (does not publish).
 * Usage: node scripts/prepublish-check.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const libPkgPath = resolve(root, "packages/vue-win95/package.json");
const libPkg = JSON.parse(readFileSync(libPkgPath, "utf8"));

const checks = [];
function check(ok, label, hint = "") {
  checks.push({ ok, label, hint });
}

check(existsSync(resolve(root, "LICENSE")), "Root LICENSE exists");
check(
  existsSync(resolve(root, "packages/vue-win95/LICENSE")),
  "Package LICENSE exists"
);
check(libPkg.license === "MIT", "package.json license = MIT");
check(
  existsSync(resolve(root, "packages/vue-win95/dist/index.js")),
  "dist/index.js built (run pnpm build)",
  "pnpm build"
);
check(
  existsSync(resolve(root, "packages/vue-win95/dist/styles.css")),
  "dist/styles.css built",
  "pnpm build"
);
check(
  existsSync(resolve(root, "packages/vue-win95/CHANGELOG.md")),
  "CHANGELOG.md shipped"
);
check(
  libPkg.peerDependencies?.vue?.startsWith("^3"),
  "peerDependency vue ^3"
);
check(
  !libPkg.version.includes("beta") || process.env.ALLOW_BETA === "1",
  `version ${libPkg.version} is publishable`,
  "set ALLOW_BETA=1 for prerelease"
);
check(
  Boolean(libPkg.repository) || process.env.SKIP_REPO === "1",
  "package.json repository field (or SKIP_REPO=1)",
  "add repository URL before npm publish"
);
check(
  Boolean(libPkg.files?.includes("dist")),
  "files includes dist"
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
