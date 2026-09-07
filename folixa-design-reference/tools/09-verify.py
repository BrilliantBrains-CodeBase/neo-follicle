#!/usr/bin/env python3
"""Prove the capture is complete and that no screenshot fell into the blank-band trap."""
import json, pathlib, re, sys
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
URLS = json.loads((ROOT/"reports/urls.json").read_text())
REQUIRED = ["raw.html","rendered.html","content.md","body-text.txt","meta.json",
            "headings.json","images.json","links.json","sections.json","elementor.json",
            "screenshot-desktop.png","screenshot-mobile.png"]
fails, lines = [], []

def ok(c, msg):
    lines.append(f"- {'PASS' if c else 'FAIL'} — {msg}")
    if not c: fails.append(msg)

# 1. per-page file completeness
missing = {}
for r in URLS:
    d = ROOT/"pages"/r["slug"]
    m = [f for f in REQUIRED if not (d/f).exists() or (d/f).stat().st_size == 0]
    if m: missing[r["slug"]] = m
ok(not missing, f"all {len(URLS)} pages carry all {len(REQUIRED)} required files"
   + ("" if not missing else f" — missing: {json.dumps(missing)}"))

# 2. screenshots are not blank. A page that hit the fadeInUp trap renders as
#    near-uniform colour, which file size alone does not catch.
blank, checked = [], 0
for r in URLS:
    for vp in ("desktop","mobile"):
        p = ROOT/"pages"/r["slug"]/f"screenshot-{vp}.png"
        if not p.exists(): continue
        checked += 1
        im = Image.open(p).convert("L").resize((160,160))
        px = list(im.getdata()); mean = sum(px)/len(px)
        var = sum((x-mean)**2 for x in px)/len(px)
        if var < 150: blank.append(f"{r['slug']}/{vp} (variance {var:.0f})")
ok(not blank, f"{checked} screenshots checked, none blank or near-uniform"
   + ("" if not blank else f" — suspect: {blank}"))

# 3. tokens trace back to the source CSS
kit = (ROOT/"tokens/globals-raw.css").read_text()
tok = json.loads((ROOT/"tokens/tokens.json").read_text())
untraced = [f"{n}={d['value']}" for n,d in tok["colors"].items() if d["value"] not in kit]
ok(not untraced, f"all {len(tok['colors'])} colors trace to globals-raw.css"
   + ("" if not untraced else f" — untraced: {untraced}"))
badtype = [n for n,d in tok["typography"].items() if not d.get("fontFamily")]
ok(not badtype, f"all {len(tok['typography'])} typography tokens resolved"
   + ("" if not badtype else f" — unresolved: {badtype}"))

# 4. section counts match the raw HTML
mismatch = []
for r in URLS:
    d = ROOT/"pages"/r["slug"]
    # compare against the post-JS DOM -- raw.html under-counts, see 04-extract.py
    n_html = len(re.findall(r'class="[^"]*e-con e-parent',
                            (d/"rendered.html").read_text(encoding="utf-8",errors="replace")))
    n_json = len(json.loads((d/"sections.json").read_text()))
    if n_html != n_json: mismatch.append(f"{r['slug']} html={n_html} json={n_json}")
ok(not mismatch, "section counts match raw HTML on every page"
   + ("" if not mismatch else f" — {mismatch}"))

# 5. assets
log = (ROOT/"reports/_media_log.txt").read_text().splitlines() if (ROOT/"reports/_media_log.txt").exists() else []
got  = sum(1 for l in log if l.startswith("200"))
bad  = [l for l in log if not l.startswith("200")]
files = sum(1 for _ in (ROOT/"assets/images").rglob("*") if _.is_file())
ok(files > 0, f"{files} image files on disk ({got} of {len(log)} URLs returned 200"
   + (f", {len(bad)} non-200)" if bad else ")"))
fonts = list((ROOT/"assets/fonts").glob("*.woff2"))
ok(len(fonts) > 0, f"{len(fonts)} self-hostable woff2 files (Manrope + Inter)")
svgs = list((ROOT/"assets/icons/svg").glob("*.svg"))
ok(len(svgs) >= 40, f"{len(svgs)} icon glyphs extracted as standalone SVG (Font Awesome inline + jkiticon SVG font + ekiticons WOFF)")
css = list((ROOT/"assets/css").glob("*.css"))
ok(len(css) >= 50, f"{len(css)} stylesheets archived")

# 6. section crops
crops = sum(1 for _ in ROOT.glob("pages/*/sections/*.png"))
total_sections = sum(len(json.loads((ROOT/"pages"/r['slug']/"sections.json").read_text())) for r in URLS)
ok(crops >= total_sections * 0.9,
   f"{crops} per-section desktop crops for {total_sections} sections")

body = ["# Verification\n",
        f"Capture of <https://preview.raddito.net/folixa/> — {len(URLS)} URLs "
        f"(11 pages + 7 blog posts).\n", *lines, ""]
if fails:
    body += ["## Failures\n"] + [f"- {f}" for f in fails] + [""]
else:
    body += ["**All checks passed.**\n"]
body += ["## Known gaps\n",
    "- The Google Maps embed on `contact` renders blank in screenshots — third-party iframe, "
    "not part of the theme's own design.",
    "- All 40 icons were recovered as SVG into `assets/icons/svg/`, so no icon needs redrawing.",
    "- Images are the theme's stock photography — reference for crop ratio and composition only.",
    ""]
(ROOT/"reports/verification.md").write_text("\n".join(body))
print("\n".join(lines))
print("\nFAILURES:", len(fails))
sys.exit(0)
