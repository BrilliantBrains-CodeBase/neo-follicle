#!/usr/bin/env python3
"""Inventory every motion effect and every icon glyph used across the site."""
import json, re, pathlib, html as htmllib
from collections import Counter
from bs4 import BeautifulSoup

ROOT = pathlib.Path(__file__).resolve().parent.parent
entrance, hover, widgets, icons, libs = Counter(), Counter(), Counter(), Counter(), Counter()
delays = Counter()
svgs = {}

for f in sorted(ROOT.glob("pages/*/raw.html")):
    raw = f.read_text(encoding="utf-8", errors="replace")
    soup = BeautifulSoup(raw, "lxml")

    for el in soup.select("[data-settings]"):
        try:
            s = json.loads(htmllib.unescape(el["data-settings"]))
        except Exception:
            continue
        for k in ("_animation", "animation"):
            if s.get(k):
                entrance[s[k]] += 1
                d = s.get("_animation_delay") or s.get("animation_delay")
                if d: delays[d] += 1
    for el in soup.select('[class*="elementor-animation-"]'):
        for c in el.get("class", []):
            if c.startswith("elementor-animation-"):
                hover[c.replace("elementor-animation-", "")] += 1
    for el in soup.select("[data-widget_type]"):
        widgets[el["data-widget_type"].split(".")[0]] += 1
    # icon fonts (<i class="jki-... / icon-...">)
    for i in soup.find_all("i", class_=True):
        name = next((c for c in i.get("class") if re.match(r'^(icon-|jki-)', c)), None)
        if name:
            icons[name] += 1
            libs["jkiticon" if name.startswith("jki") else "ekiticons"] += 1
    # Elementor inlines Font Awesome as SVG: class="e-font-icon-svg e-fas-sun"
    for svg in soup.select("svg.e-font-icon-svg"):
        name = next((c for c in svg.get("class", [])
                     if re.match(r'^e-fa[srlbd]-', c)), None)
        if name:
            icons[name] += 1
            libs["font-awesome-inline-svg"] += 1
            svgs.setdefault(name, str(svg))

out = {
    "entranceAnimations": dict(entrance.most_common()),
    "entranceDelays": dict(delays.most_common()),
    "hoverAnimations": dict(hover.most_common()),
    "widgetUsage": dict(widgets.most_common()),
    "iconsUsed": dict(icons.most_common()),
    "iconLibraries": dict(libs),
    "uniqueIcons": len(icons),
}
# Elementor already inlines Font Awesome as SVG, so the rebuild can drop the icon
# fonts entirely -- dump each unique glyph as a standalone file.
svgdir = ROOT/"assets/icons/svg"; svgdir.mkdir(parents=True, exist_ok=True)
for name, markup in svgs.items():
    (svgdir/f"{name.replace('e-fa','fa').replace('-','_',1)}.svg").write_text(markup)
out["inlineSvgExtracted"] = len(svgs)
(ROOT/"reports/motion-icons.json").write_text(json.dumps(out, indent=2))
print("entrance:", dict(entrance))
print("delays  :", dict(delays))
print("hover   :", dict(hover))
print("icon libs:", dict(libs), "| unique glyphs:", len(icons))
print("top icons:", [k for k,_ in icons.most_common(18)])
print("widgets :", dict(widgets.most_common(25)))
