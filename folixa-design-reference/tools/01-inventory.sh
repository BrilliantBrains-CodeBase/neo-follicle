#!/usr/bin/env bash
# Enumerate every Folixa URL + media item from the WP REST API.
set -euo pipefail
BASE="https://preview.raddito.net/folixa"
OUT="$(cd "$(dirname "$0")/.." && pwd)"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
mkdir -p "$OUT/reports"

fetch() { curl -sSL -A "$UA" "$1"; }

fetch "$BASE/wp-json/wp/v2/pages?per_page=100&_fields=id,slug,link,title,date,modified" \
  > "$OUT/reports/_wp-pages.json"
fetch "$BASE/wp-json/wp/v2/posts?per_page=100&_fields=id,slug,link,title,date,modified,categories" \
  > "$OUT/reports/_wp-posts.json"

# media paginates: 93 items, per_page max 100
fetch "$BASE/wp-json/wp/v2/media?per_page=100&_fields=id,slug,source_url,alt_text,media_type,mime_type,media_details" \
  > "$OUT/reports/_wp-media.json"

python3 - "$OUT" <<'PY'
import json, sys, pathlib
out = pathlib.Path(sys.argv[1])
pages = json.load(open(out/"reports/_wp-pages.json"))
posts = json.load(open(out/"reports/_wp-posts.json"))
media = json.load(open(out/"reports/_wp-media.json"))

rows = []
for p in pages:
    rows.append({"kind":"page","id":p["id"],"slug":p["slug"],"url":p["link"],
                 "title":p["title"]["rendered"]})
for p in posts:
    rows.append({"kind":"post","id":p["id"],"slug":p["slug"],"url":p["link"],
                 "title":p["title"]["rendered"]})

json.dump(rows, open(out/"reports/urls.json","w"), indent=2)
(out/"reports/urls.txt").write_text("\n".join(r["url"] for r in rows)+"\n")
print(f"pages={len(pages)} posts={len(posts)} total={len(rows)} media={len(media)}")
PY
