#!/usr/bin/env bash
# Download every stylesheet referenced by any page, flattened by plugin/path.
set -uo pipefail
OUT="$(cd "$(dirname "$0")/.." && pwd)"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36"
mkdir -p "$OUT/assets/css"

grep -ohE "href='[^']*\.css[^']*'" "$OUT"/pages/*/raw.html \
  | sed "s/href='//;s/'$//" | sed 's/?ver=.*//' | sort -u \
  | grep '^https' > "$OUT/reports/_css-urls.txt"

while read -r url; do
  # flatten: keep the last two path segments for readability
  name=$(echo "$url" | sed 's#.*/wp-content/##; s#.*/wp-includes/##; s#/#__#g')
  curl -sSL -A "$UA" "$url" -o "$OUT/assets/css/$name" \
    -w "%{http_code} $name\n"
done < "$OUT/reports/_css-urls.txt" | tee "$OUT/reports/_css_log.txt" | grep -c '^200' \
  | xargs -I{} echo "downloaded {} stylesheets"
