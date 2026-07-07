// Record a real screen-capture walkthrough of the app to a .webm video.
// Usage: node scripts/record_demo.mjs [baseURL] [outDir]
// Requires the preview/dev server running at baseURL.
import { chromium } from "playwright";
import { mkdirSync, readdirSync, renameSync } from "node:fs";

const base = process.argv[2] || "http://localhost:4173";
const outDir = process.argv[3] || "../docs/demo/video";
mkdirSync(outDir, { recursive: true });
const W = 1440, H = 810;

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell",
});
const context = await browser.newContext({
  viewport: { width: W, height: H },
  recordVideo: { dir: outDir, size: { width: W, height: H } },
});
const page = await context.newPage();

// Inject a visible cursor that follows Playwright's mouse events.
await page.addInitScript(() => {
  window.addEventListener("DOMContentLoaded", () => {
    const c = document.createElement("div");
    c.id = "__cursor";
    Object.assign(c.style, {
      position: "fixed", zIndex: 99999, width: "22px", height: "22px",
      marginLeft: "-6px", marginTop: "-6px", borderRadius: "50%",
      background: "rgba(45,212,191,0.35)", border: "2px solid #2dd4bf",
      pointerEvents: "none", transition: "transform 0.08s ease-out",
      boxShadow: "0 0 12px rgba(45,212,191,0.6)", left: "0", top: "0",
    });
    document.body.appendChild(c);
    document.addEventListener("mousemove", (e) => {
      c.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  });
});

const sleep = (ms) => page.waitForTimeout(ms);
async function moveTo(sel, pause = 500) {
  const el = page.locator(sel).first();
  await el.scrollIntoViewIfNeeded().catch(() => {});
  const b = await el.boundingBox();
  if (b) await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 24 });
  await sleep(pause);
  return el;
}
async function goto(path) { await page.goto(base + path, { waitUntil: "networkidle" }); await sleep(1200); }

// ---- Walkthrough ----
await goto("/");                                   // Overview
await page.mouse.move(720, 400, { steps: 10 }); await sleep(2200);

await goto("/questions");                           // Questions
for (let y = 0; y < 500; y += 100) { await page.mouse.wheel(0, 100); await sleep(320); }
await sleep(1200);

await goto("/evidence");                            // Evidence
const runBtn = await moveTo("text=Run Evidence Agent", 600);
await runBtn.click();
await sleep(17000);                                 // let the four moves run over 8 questions
await moveTo("text=added clinical benefit", 700).then((el) => el.click());
await sleep(1800);
for (let y = 0; y < 600; y += 120) { await page.mouse.wheel(0, 120); await sleep(340); }
await sleep(1200);
await page.mouse.wheel(0, -700); await sleep(600);
await moveTo("text=budget impact", 700).then((el) => el.click().catch(() => {}));
await sleep(2600);

await goto("/impact");                              // Impact
await sleep(1800);
for (let y = 0; y < 700; y += 120) { await page.mouse.wheel(0, 120); await sleep(360); }
await sleep(2000);

await context.close();                              // finalize video
await browser.close();

// Rename the generated video to a stable name.
const files = readdirSync(outDir).filter((f) => f.endsWith(".webm"));
if (files.length) {
  renameSync(`${outDir}/${files[0]}`, `${outDir}/evidence-agent-walkthrough.webm`);
  console.log("saved", `${outDir}/evidence-agent-walkthrough.webm`);
}
