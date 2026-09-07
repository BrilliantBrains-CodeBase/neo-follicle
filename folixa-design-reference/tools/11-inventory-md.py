#!/usr/bin/env python3
"""Render 00-INVENTORY.md from the capture manifests."""
import json, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
S = json.loads((ROOT/"reports/pages-summary.json").read_text())
M = json.loads((ROOT/"reports/motion-icons.json").read_text())
T = json.loads((ROOT/"tokens/tokens.json").read_text())

def crops(slug):
    d = ROOT/"pages"/slug/"sections"
    return len(list(d.glob("*.png"))) if d.exists() else 0
def shots(slug):
    d = ROOT/"pages"/slug
    return sum((d/f"screenshot-{v}.png").exists() for v in ("desktop","mobile"))

pages = [r for r in S if r["kind"] == "page"]
posts = [r for r in S if r["kind"] == "post"]

L = [
"# Inventory — Folixa Design Reference",
"",
f"Source: <https://preview.raddito.net/folixa/> — **Folixa, Hair Transplant Clinic & Hair "
f"Restoration Elementor Template Kit**.",
"",
f"**{len(S)} URLs** ({len(pages)} pages + {len(posts)} blog posts) · "
f"**{sum(r['sections'] for r in S)} sections** · "
f"**{sum(r['widgets'] for r in S)} widgets** · "
f"**{M['uniqueIcons']} unique icons** · 93 media records",
"",
"## Stack captured",
"",
"| Layer | What it is |",
"|---|---|",
"| Platform | WordPress + `hello-elementor` theme |",
"| Builder | Elementor 4.2.4 (Global Kit `post-6.css`) |",
"| Widget packs | `jeg-elementor-kit` 3.2.15, `elementskit-lite`, `metform` |",
"| Fonts | Manrope (headings), Inter (body) — Roboto enqueued but unused |",
"| Icons | Font Awesome (inlined as SVG), jkiticon, ekiticons |",
"| Slider | tiny-slider |",
"| Tailwind | none — the brief's premise; translated in `tokens/` |",
"",
"## Design tokens",
"",
"| Role | Value |",
"|---|---|",
]
for n, d in T["colors"].items():
    L.append(f"| `{n}` | `{d['value']}` — {d['usage']} |")
L += ["",
"Type scale (all fluid `clamp()`, ported verbatim):",
"",
"| Token | Family | Size |",
"|---|---|---|",
]
for n, d in T["typography"].items():
    if d.get("fontSize"):
        L.append(f"| `{n}` | {d['fontFamily']} {d['fontWeight']} | `{d['fontSize']}` |")

L += ["",
"## Pages",
"",
"| # | Slug | Title | Sections | Widgets | Imgs | Shots | Crops |",
"|---|---|---|---|---|---|---|---|"]
for i, r in enumerate(pages, 1):
    L.append(f"| {i} | [`{r['slug']}`]({r['url']}) | {r['title']} | {r['sections']} | "
             f"{r['widgets']} | {r['images']} | {shots(r['slug'])}/2 | {crops(r['slug'])} |")
L += ["",
"## Blog posts",
"",
"| # | Slug | Title | Sections | Widgets | Shots | Crops |",
"|---|---|---|---|---|---|---|"]
for i, r in enumerate(posts, 1):
    L.append(f"| {i} | [`{r['slug']}`]({r['url']}) | {r['title'][:50]} | {r['sections']} | "
             f"{r['widgets']} | {shots(r['slug'])}/2 | {crops(r['slug'])} |")

L += ["",
"All 7 posts share one 4-section template — capture them once, build `single-post` once.",
"",
"## Motion",
"",
f"- Entrance: **`fadeInUp` only**, {M['entranceAnimations'].get('fadeInUp',0)} uses, "
f"delays {', '.join(f'{k}ms' for k in M['entranceDelays'])}",
f"- Hover: `float` ×{M['hoverAnimations'].get('float',0)}, `grow` ×{M['hoverAnimations'].get('grow',0)}",
"- Full detail and the Vite/Tailwind replacement map: `reports/animations.md`",
"",
"## Files per page",
"",
"```",
"pages/<slug>/",
"  raw.html         server HTML — authoritative for meta + JSON-LD",
"  rendered.html    post-JavaScript DOM (Firecrawl)",
"  content.md       clean readable copy",
"  body-text.txt    plain text, for diffing after the rebuild",
"  meta.json        title / meta / og / link-rel",
"  schema.jsonld    JSON-LD graph (where present)",
"  headings.json    h1–h6 outline in document order",
"  images.json      every <img> with alt, dimensions, srcset",
"  links.json       internal vs external",
"  sections.json    ordered section anatomy with resolved CSS  ← the rebuild spec",
"  elementor.json   widget tree",
"  screenshot-desktop.png / screenshot-mobile.png",
"  sections/NN-<name>.png",
"```",
"",
"## Where to start",
"",
"| File | Use |",
"|---|---|",
"| `DESIGN.md` | the design system, written for a human or an agent |",
"| `tokens/tailwind.config.js` | drop straight into the Vite project |",
"| `pages/<slug>/sections.json` | rebuild a section without consulting the live site |",
"| `reports/components.md` | the ~12 components to build once |",
"| `reports/animations.md` | motion + what to drop |",
"| `reports/verification.md` | proof the capture is complete |",
""]
(ROOT/"00-INVENTORY.md").write_text("\n".join(L))
print(f"00-INVENTORY.md: {len(L)} lines")
