/**
 * Optional Playwright visual smoke (install browsers first):
 *   pnpm add -D @playwright/test && npx playwright install chromium
 *   node scripts/visual-smoke.mjs
 *
 * Builds nothing; expects docs-site dev server or `pnpm docs:build` + preview.
 */
import { chromium } from "@playwright/test";

const URL = process.env.DOCS_URL || "http://localhost:5174/";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(URL, { waitUntil: "networkidle" });
await page.screenshot({ path: "docs-site-visual.png", fullPage: true });
console.log("Saved docs-site-visual.png");
await browser.close();
