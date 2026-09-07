#!/usr/bin/env bash
# Fetch server-delivered HTML for every URL. Elementor renders server-side,
# so raw.html is authoritative for meta, JSON-LD and full copy.
set -uo pipefail
OUT="$(cd "$(dirname "$0")/.." && pwd)"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
LOG="$OUT/reports/_curl_status.txt"
: > "$LOG"

python3 -c "
import json,sys
for r in json.load(open('$OUT/reports/urls.json')): print(r['slug'],r['url'])
" | while read -r slug url; do
  mkdir -p "$OUT/pages/$slug"
  code=$(curl -sSL -A "$UA" "$url" -o "$OUT/pages/$slug/raw.html" \
         -w '%{http_code} %{size_download}')
  echo "$slug $url $code" | tee -a "$LOG"
done
