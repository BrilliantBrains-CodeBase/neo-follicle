#!/usr/bin/env bash
# Post-JavaScript DOM + clean markdown via Firecrawl. Concurrency 2 = account limit.
set -uo pipefail
OUT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$OUT"
: > reports/_firecrawl_log.txt

python3 -c "
import json
for r in json.load(open('reports/urls.json')): print(r['slug']+'\t'+r['url'])
" > /tmp/fc-list.tsv

scrape_one() {
  slug="${1%%$'\t'*}"; url="${1##*$'\t'}"
  mkdir -p "pages/$slug"
  if firecrawl scrape "$url" --format rawHtml,markdown,links,images \
       --json --pretty --wait-for 3000 -o "pages/$slug/_firecrawl.json" >/dev/null 2>&1; then
    echo "OK   $slug"
  else
    echo "FAIL $slug"
  fi
}
export -f scrape_one

tr '\n' '\0' < /tmp/fc-list.tsv | xargs -0 -P2 -I{} bash -c 'scrape_one "$@"' _ {} \
  | tee -a reports/_firecrawl_log.txt
