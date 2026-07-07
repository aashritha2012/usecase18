// Screenshot the built app across routes. Usage: node scripts/screenshot.mjs [baseURL] [outDir]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.argv[2] || "http://localhost:4173";
const outDir = process.argv[3] || "../docs/screenshots";
mkdirSync(outDir, { recursive: true });

const routes = [
  { path: "/", name: "01-overview" },
  { path: "/questions", name: "02-questions" },
  { path: "/evidence", name: "03-evidence" },
  { path: "/impact", name: "04-impact" },
];

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

for (const r of routes) {
  await page.goto(base + r.path, { waitUntil: "networkidle" });
  await page.waitForTimeout(1600); // let animations + count-ups settle
  await page.screenshot({ path: `${outDir}/${r.name}.png`, fullPage: true });
  console.log("captured", r.name);
}

await browser.close();
console.log("done");
