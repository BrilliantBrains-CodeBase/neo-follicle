/**
 * Long (full-page) screenshots of every Folixa page, plus per-section desktop crops.
 *
 * Two traps this defeats, both of which silently produce blank bands:
 *   1. Elementor holds animated elements at opacity:0 via .elementor-invisible
 *      until they scroll into view.
 *   2. Most images are loading="lazy" and never decode off-screen.
 * We scroll-prime, force eager decoding, then neutralise the animation gate --
 * targeting Elementor's own classes rather than blanket `* { opacity:1 }`, which
 * would also reveal off-canvas menus and overlays that are meant to stay hidden.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const urls = JSON.parse(fs.readFileSync(path.join(ROOT, 'reports/urls.json'), 'utf8'));
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, sections: true },
  { name: 'mobile',  width: 390,  height: 844, sections: false },
];

const FREEZE = `
  .elementor-invisible { opacity: 1 !important; }
  .animated { opacity: 1 !important; animation: none !important; }
  *, *::before, *::after {
    animation-duration: 0s !important; animation-delay: 0s !important;
    transition-duration: 0s !important; transition-delay: 0s !important;
    scroll-behavior: auto !important;
  }
`;

async function prime(page) {
  // force every lazy image to load and decode now
  await page.evaluate(() => {
    document.querySelectorAll('img').forEach(i => {
      i.loading = 'eager';
      i.decoding = 'sync';
      if (i.dataset.src && !i.src) i.src = i.dataset.src;
    });
    document.querySelectorAll('iframe').forEach(f => (f.loading = 'eager'));
  });
  // step to the bottom so IntersectionObservers fire, then back to the top
  await page.evaluate(async () => {
    const step = Math.floor(window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 400));
  });
  // release the animation gate only after everything has been observed
  await page.evaluate(() => {
    document.querySelectorAll('.elementor-invisible')
      .forEach(e => e.classList.remove('elementor-invisible'));
  });
  // JKit's portfolio gallery is a hover-reveal tabbed component: every panel is
  // visibility:hidden with its background applied only on interaction, so a static
  // capture shows an empty band. Reveal the active panel from its data-background
  // so the section is actually legible in the design reference.
  await page.evaluate(() => {
    document.querySelectorAll('.jkit-portfolio-gallery .image-item').forEach(el => {
      const bg = el.dataset.background;
      if (bg) el.style.backgroundImage = `url(${bg})`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      if (el.classList.contains('current-item')) el.style.visibility = 'visible';
    });
  });
  await page.addStyleTag({ content: FREEZE });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
}

async function unstick(page) {
  // a fixed/sticky header would otherwise repeat down the whole long screenshot
  return page.evaluate(() => {
    const undone = [];
    document.querySelectorAll('body *').forEach(el => {
      const p = getComputedStyle(el).position;
      if (p === 'fixed' || p === 'sticky') { el.dataset.wasPos = p; el.style.position = 'static'; undone.push(1); }
    });
    return undone.length;
  });
}

const browser = await chromium.launch();
const log = [];

for (const rec of urls) {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      userAgent: vp.name === 'mobile'
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        : undefined,
      isMobile: vp.name === 'mobile',
      hasTouch: vp.name === 'mobile',
    });
    const page = await ctx.newPage();
    const dir = path.join(ROOT, 'pages', rec.slug);
    const target = path.join(dir, `screenshot-${vp.name}.png`);
    // A desktop capture is only complete if its section crops exist too.
    const cropsDone = !vp.sections ||
      (fs.existsSync(path.join(dir, 'sections')) &&
       fs.readdirSync(path.join(dir, 'sections')).filter(f => f.endsWith('.png')).length > 0);
    if (!process.env.FORCE && fs.existsSync(target) && fs.statSync(target).size > 0 && cropsDone) {
      console.log(`  ${rec.slug} [${vp.name}] skip (already captured)`);
      log.push({ slug: rec.slug, viewport: vp.name, ok: true, skipped: true });
      await ctx.close();
      continue;
    }
    try {
      // The preview host is slow and drops connections under load; retry rather
      // than lose the rest of the run to one transient failure.
      let lastErr;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await page.goto(rec.url, { waitUntil: 'networkidle', timeout: 90_000 });
          lastErr = null;
          break;
        } catch (e) {
          lastErr = e;
          console.log(`    retry ${attempt}/3 ${rec.slug} [${vp.name}]`);
          await page.waitForTimeout(5000 * attempt);
        }
      }
      if (lastErr) throw lastErr;
      await prime(page);
      const stuck = await unstick(page);
      const file = target;
      await page.screenshot({ path: file, fullPage: true });
      const kb = Math.round(fs.statSync(file).size / 1024);
      log.push({ slug: rec.slug, viewport: vp.name, ok: true, kb, unstuck: stuck });
      console.log(`  ${rec.slug} [${vp.name}] ${kb}KB (unstuck ${stuck})`);

      if (vp.sections) {
        const secDir = path.join(dir, 'sections');
        fs.mkdirSync(secDir, { recursive: true });
        const meta = JSON.parse(fs.readFileSync(path.join(dir, 'sections.json'), 'utf8'));
        const els = await page.$$('div.e-con.e-parent');
        // Match by data-id rather than position: a page can mount containers at
        // runtime, and positional naming would silently mislabel every crop after one.
        const byId = new Map(meta.map(m => [m.id, m]));
        for (let i = 0; i < els.length; i++) {
          const id = await els[i].getAttribute('data-id');
          const name = byId.get(id)?.name ?? `section-${i + 1}`;
          const out = path.join(secDir, `${String(i + 1).padStart(2, '0')}-${name}.png`);
          try { await els[i].screenshot({ path: out }); }
          catch (e) { console.log(`    ! section ${i + 1} ${name}: ${e.message.split('\n')[0]}`); }
        }
        console.log(`    + ${els.length} section crops`);
      }
    } catch (e) {
      log.push({ slug: rec.slug, viewport: vp.name, ok: false, error: e.message.split('\n')[0] });
      console.log(`  FAIL ${rec.slug} [${vp.name}] ${e.message.split('\n')[0]}`);
    }
    await ctx.close();
  }
}
await browser.close();
fs.writeFileSync(path.join(ROOT, 'reports/_screenshot_log.json'), JSON.stringify(log, null, 2));
console.log(`done: ${log.filter(l => l.ok).length}/${log.length} captures`);
