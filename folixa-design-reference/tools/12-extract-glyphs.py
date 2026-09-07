#!/usr/bin/env python3
"""Extract the icon-font glyphs the site actually uses as standalone SVG files.

jkiticon ships an IcoMoon SVG font, so the real glyph outlines are recoverable --
no need to redraw or approximate them from another icon set. SVG fonts use a
y-up coordinate system, so each path is flipped back into normal SVG space.
"""
import json, re, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
used = json.loads((ROOT/"reports/motion-icons.json").read_text())["iconsUsed"]
font = (ROOT/"assets/icons/jkiticon.svg").read_text(encoding="utf-8", errors="replace")

m = re.search(r'units-per-em="(\d+)"[^>]*ascent="(-?\d+)"', font)
upm, ascent = (int(m.group(1)), int(m.group(2))) if m else (1024, 960)

glyphs, by_code = {}, {}
for g in re.finditer(r'<glyph([^>]*)/>', font):
    a = g.group(1)
    name = re.search(r'glyph-name="([^"]+)"', a)
    uni  = re.search(r'unicode="([^"]+)"', a)
    d    = re.search(r'\sd="([^"]*)"', a)
    if not (d and d.group(1).strip()):
        continue
    if name:
        glyphs[name.group(1)] = d.group(1)
    if uni:
        u = uni.group(1)
        cp = (int(u[3:-1], 16) if u.startswith("&#x")
              else int(u[2:-1]) if u.startswith("&#")
              else ord(u) if len(u) == 1 else None)
        if cp is not None:
            by_code[cp] = d.group(1)

# Many classes (every "-light" variant) carry a glyph-name unrelated to the class,
# so the authoritative mapping is the codepoint the CSS assigns to each class.
css = (ROOT/"assets/icons/jkiticon.css").read_text(encoding="utf-8", errors="replace")
cls_code = {}
for m in re.finditer(r'\.(jki-[a-z0-9-]+)::?before\{content:"([^"]+)"\}', css):
    v = m.group(2)
    cp = int(v[1:], 16) if v.startswith("\\") else ord(v[0])
    cls_code[m.group(1)] = cp

out = ROOT/"assets/icons/svg"; out.mkdir(parents=True, exist_ok=True)
got, miss = [], []
for cls in used:
    if not cls.startswith("jki-"):
        continue
    key = cls[4:]
    d = by_code.get(cls_code.get(cls, -1)) or glyphs.get(key)
    if not d:
        miss.append(cls); continue
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {upm} {upm}" '
           f'fill="currentColor" aria-hidden="true">'
           f'<g transform="translate(0,{ascent}) scale(1,-1)"><path d="{d}"/></g></svg>')
    (out/f"{cls}.svg").write_text(svg)
    got.append(cls)

print(f"extracted {len(got)} jkiticon glyphs")
if miss:
    print(f"not found in font ({len(miss)}): {miss}")
print(f"total SVGs in assets/icons/svg: {len(list(out.glob('*.svg')))}")

# ---- ekiticons ships only a binary WOFF, so pull its used glyphs via fontTools ----
try:
    from fontTools.ttLib import TTFont
    from fontTools.pens.svgPathPen import SVGPathPen
    ek_css = (ROOT/"assets/icons/ekiticons.css").read_text(encoding="utf-8", errors="replace")
    ek_map = {m.group(1): (int(m.group(2)[1:], 16) if m.group(2).startswith("\\")
                           else ord(m.group(2)[0]))
              for m in re.finditer(r'\.(icon-[a-z0-9-]+)::?before\{content:"([^"]+)"\}', ek_css)}
    f = TTFont(ROOT/"assets/icons/elementskit.woff")
    cmap, gs = f.getBestCmap(), f.getGlyphSet()
    e_upm, e_asc = f["head"].unitsPerEm, f["hhea"].ascent
    n = 0
    for cls in used:
        if not cls.startswith("icon-") or cls not in ek_map:
            continue
        gname = cmap.get(ek_map[cls])
        if not gname:
            continue
        pen = SVGPathPen(gs); gs[gname].draw(pen)
        (out/f"{cls}.svg").write_text(
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {e_upm} {e_upm}" '
            f'fill="currentColor" aria-hidden="true">'
            f'<g transform="translate(0,{e_asc}) scale(1,-1)"><path d="{pen.getCommands()}"/></g></svg>')
        n += 1
    print(f"extracted {n} ekiticons glyphs")
except ImportError:
    print("fontTools not installed - skipping ekiticons (pip install fonttools)")

print(f"TOTAL SVGs: {len(list(out.glob('*.svg')))}")
