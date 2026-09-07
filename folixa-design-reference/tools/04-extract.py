#!/usr/bin/env python3
"""Decompose every captured page into meta, outline, assets and section anatomy.

The section anatomy is the point: each top-level Elementor container becomes one
entry carrying its own resolved CSS, so a section can be rebuilt from that entry
alone without consulting the live site.
"""
import json, re, pathlib, html as htmllib
from bs4 import BeautifulSoup

ROOT  = pathlib.Path(__file__).resolve().parent.parent
URLS  = json.loads((ROOT/"reports/urls.json").read_text())
CSSD  = ROOT/"assets/css"
SITE  = "preview.raddito.net"

def slugify(s, n=6):
    s = re.sub(r'[^a-z0-9\s-]', '', (s or '').lower())
    words = [w for w in re.split(r'[\s-]+', s) if w][:n]
    return "-".join(words) or "section"

# Header (1741), footer (1736) and the shared global template (551) live in their
# own generated files, so a page's sections are only fully resolvable against all four.
SHARED_IDS = (1741, 1736, 551)

def _css(post_id):
    f = CSSD/f"uploads__sites__226__elementor__css__post-{post_id}.css"
    return f.read_text() if f.exists() else ""

def page_css(post_id):
    return "\n".join(_css(i) for i in (post_id, *SHARED_IDS))

def rules_for(css, eid):
    """Every declaration block in the page CSS that targets this element id."""
    out = []
    for m in re.finditer(r'([^{}]+)\{([^{}]*)\}', css):
        sel, body = m.group(1).strip(), m.group(2).strip()
        if f"elementor-element-{eid}" in sel and body:
            out.append({"selector": re.sub(r'\s+', ' ', sel), "declarations": body})
    return out

def widget_info(w):
    d = {"type": w.get("data-widget_type", "").split(".")[0], "id": w.get("data-id")}
    txt = w.get_text(" ", strip=True)
    if txt:
        d["text"] = txt[:300]
    st = w.get("data-settings")
    if st:
        try:
            s = json.loads(htmllib.unescape(st))
            keep = {k: v for k, v in s.items()
                    if k in ("_animation", "_animation_delay", "animation", "speed",
                             "autoplay", "slides_to_show", "starting_number",
                             "ending_number", "suffix", "prefix")}
            if keep:
                d["settings"] = keep
        except Exception:
            pass
    a = w.get("class") or []
    anim = [c for c in a if c.startswith("elementor-animation-")]
    if anim:
        d["hoverAnimation"] = anim[0].replace("elementor-animation-", "")
    return d

summary = []
for rec in URLS:
    slug, pid = rec["slug"], rec["id"]
    pdir = ROOT/"pages"/slug
    raw  = (pdir/"raw.html").read_text(encoding="utf-8", errors="replace")
    soup = BeautifulSoup(raw, "lxml")
    css  = page_css(pid)

    # Section anatomy comes from the post-JS DOM, not the server HTML. The shared
    # template (id 551) is mounted by React and ships in raw.html as JSX-style
    # `className=`, which no HTML parser treats as a class -- so raw.html under-counts
    # containers by one on most pages, and the crop indices would drift.
    rend = pdir/"rendered.html"
    dom  = BeautifulSoup(rend.read_text(encoding="utf-8", errors="replace"), "lxml") \
           if rend.exists() else soup

    # ---- meta ----
    meta = {"url": rec["url"], "slug": slug, "wpId": pid,
            "title": soup.title.get_text(strip=True) if soup.title else None,
            "meta": {}, "og": {}, "link": {}}
    for t in soup.find_all("meta"):
        k = t.get("name") or t.get("property")
        if k:
            (meta["og"] if k.startswith(("og:", "twitter:")) else meta["meta"])[k] = t.get("content")
    for t in soup.find_all("link", rel=True):
        meta["link"].setdefault(" ".join(t.get("rel")), []).append(t.get("href"))
    (pdir/"meta.json").write_text(json.dumps(meta, indent=2))

    # ---- JSON-LD (survives only in raw html) ----
    ld = [json.loads(s.string) for s in soup.find_all("script", type="application/ld+json")
          if s.string and s.string.strip().startswith(("{", "["))]
    if ld:
        (pdir/"schema.jsonld").write_text(json.dumps(ld, indent=2))

    # ---- outline ----
    heads = [{"level": int(h.name[1]), "text": h.get_text(" ", strip=True)}
             for h in soup.find_all(re.compile(r"^h[1-6]$"))
             if h.get_text(strip=True)]
    (pdir/"headings.json").write_text(json.dumps(heads, indent=2))

    # ---- images ----
    imgs = [{"src": i.get("src"), "alt": i.get("alt", ""), "width": i.get("width"),
             "height": i.get("height"), "loading": i.get("loading"),
             "srcset": i.get("srcset"), "class": " ".join(i.get("class") or [])}
            for i in soup.find_all("img")]
    (pdir/"images.json").write_text(json.dumps(imgs, indent=2))

    # ---- links ----
    links = {"internal": [], "external": []}
    for a in soup.find_all("a", href=True):
        h = a["href"]
        if h.startswith("#") or h.startswith("javascript:"):
            continue
        rec_l = {"href": h, "text": a.get_text(" ", strip=True)[:120]}
        (links["internal"] if SITE in h or h.startswith("/") else links["external"]).append(rec_l)
    (pdir/"links.json").write_text(json.dumps(links, indent=2))

    # ---- body text ----
    body = soup.find("body")
    for bad in body.find_all(["script", "style", "noscript"]):
        bad.decompose()
    (pdir/"body-text.txt").write_text(body.get_text("\n", strip=True))

    # ---- section anatomy ----
    sections, tree = [], []
    parents = dom.select("div.e-con.e-parent")
    for idx, sec in enumerate(parents, 1):
        eid  = (sec.get("data-id") or "")
        h    = sec.find(re.compile(r"^h[1-6]$"))
        name = slugify(h.get_text(" ", strip=True)) if h else f"section-{idx}"
        widgets = [widget_info(w) for w in sec.select("[data-widget_type]")]
        anim = None
        st = sec.get("data-settings")
        if st:
            try:
                s = json.loads(htmllib.unescape(st))
                if s.get("animation") or s.get("_animation"):
                    anim = {"type": s.get("animation") or s.get("_animation"),
                            "delay": s.get("animation_delay") or s.get("_animation_delay")}
            except Exception:
                pass
        sections.append({
            "index": idx, "id": eid, "name": name,
            "heading": h.get_text(" ", strip=True) if h else None,
            "classes": " ".join(sec.get("class") or []),
            "widgetTypes": sorted({w["type"] for w in widgets if w["type"]}),
            "widgetCount": len(widgets),
            "animation": anim,
            "css": rules_for(css, eid),
            "widgets": widgets,
            "screenshot": f"sections/{idx:02d}-{name}.png",
        })
        tree.append({"index": idx, "id": eid, "name": name,
                     "widgets": [w["type"] for w in widgets if w["type"]]})
    (pdir/"sections.json").write_text(json.dumps(sections, indent=2))
    (pdir/"elementor.json").write_text(json.dumps(
        {"slug": slug, "wpId": pid, "cssFile": f"post-{pid}.css", "tree": tree}, indent=2))

    summary.append({"slug": slug, "kind": rec["kind"], "title": rec["title"],
                    "url": rec["url"], "sections": len(sections),
                    "widgets": sum(s["widgetCount"] for s in sections),
                    "images": len(imgs), "headings": len(heads)})
    print(f"{slug:55s} sections={len(sections):2d} widgets={summary[-1]['widgets']:3d} imgs={len(imgs):2d}")

(ROOT/"reports/pages-summary.json").write_text(json.dumps(summary, indent=2))
