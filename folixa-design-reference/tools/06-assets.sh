#!/usr/bin/env bash
# Images (REST manifest + every HTML reference), self-hostable fonts, icon fonts.
set -uo pipefail
OUT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$OUT"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36"
mkdir -p assets/images assets/fonts assets/icons

# ---- 1. union of REST media + every URL referenced in the HTML ----
.venv/bin/python - <<'PY'
import json, re, pathlib
root = pathlib.Path(".")
urls = set()
for m in json.load(open("reports/_wp-media.json")):
    if m.get("source_url"): urls.add(m["source_url"])
    for s in (m.get("media_details") or {}).get("sizes", {}).values():
        if s.get("source_url"): urls.add(s["source_url"])
pat = re.compile(r'https://preview\.raddito\.net/folixa/wp-content/uploads/[^\s"\'<>)\\]+')
for f in root.glob("pages/*/raw.html"):
    urls |= set(pat.findall(f.read_text(encoding="utf-8", errors="replace")))
urls = {u.replace("&#038;", "&").split("?")[0] for u in urls}
urls = {u for u in urls if not u.endswith((".css", ".js"))}
pathlib.Path("reports/_asset-urls.txt").write_text("\n".join(sorted(urls))+"\n")
print(f"{len(urls)} unique asset URLs (REST manifest + HTML references)")
PY

# ---- 2. download preserving upload paths ----
# 8-way parallel with a hard per-file timeout: a single unresponsive URL
# otherwise stalls the whole run indefinitely.
: > reports/_media_log.txt
get_one() {
  url="$1"
  rel="${url#https://preview.raddito.net/folixa/wp-content/uploads/sites/226/}"
  dest="assets/images/$rel"; mkdir -p "$(dirname "$dest")"
  code=$(curl -sSL --connect-timeout 10 --max-time 60 --retry 2 \
         -A "$UA" "$url" -o "$dest" -w '%{http_code}')
  [ "$code" != "200" ] && rm -f "$dest"
  echo "$code $rel" >> reports/_media_log.txt
}
export -f get_one; export UA
xargs -P8 -I{} bash -c 'get_one "$@"' _ {} < reports/_asset-urls.txt
echo "images: $(grep -c '^200' reports/_media_log.txt) ok, $(grep -vc '^200' reports/_media_log.txt) failed"

# ---- 3. self-hostable webfonts (only the weights the kit actually uses) ----
GF="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700&family=Inter:wght@400;500&display=swap"
curl -sSL -A "$UA" "$GF" -o assets/fonts/fonts.css
grep -oE 'https://fonts\.gstatic\.com/[^)]+\.woff2' assets/fonts/fonts.css | sort -u | while read -r f; do
  curl -sSL "$f" -o "assets/fonts/$(basename "$f")"
done
echo "fonts: $(ls assets/fonts/*.woff2 2>/dev/null | wc -l | tr -d ' ') woff2 files"

# ---- 4. icon fonts ----
for u in \
  "https://preview.raddito.net/folixa/wp-content/plugins/elementor/assets/lib/font-awesome/css/all.min.css" \
  "https://preview.raddito.net/folixa/wp-content/plugins/elementskit-lite/modules/elementskit-icon-pack/assets/css/ekiticons.css" \
  "https://preview.raddito.net/folixa/wp-content/plugins/jeg-elementor-kit/assets/fonts/jkiticon/jkiticon.css" ; do
  curl -sSL -A "$UA" "$u" -o "assets/icons/$(basename "$u")"
done
echo "icon css: $(ls assets/icons/ | wc -l | tr -d ' ') files"
