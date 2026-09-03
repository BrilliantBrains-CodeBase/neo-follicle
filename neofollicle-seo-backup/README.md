# SEO Backup & Content Archive — neofollicletransplant.com

A complete, verifiable snapshot of the live site, captured as the source of truth for the rebuild
and as a disaster-recovery backup of every ranking signal.

**Rule for the rebuild: everything in `01-SEO-MASTER.csv` marked PRESERVE must carry over byte-for-byte.**
See `reports/seo-audit.md` for what to preserve vs. what is safe to fix.

## Start here

| File | What it is |
|---|---|
| `00-INVENTORY.md` | All 59 URLs, split into 53 indexable + 6 `noindex` ad landing pages |
| `01-SEO-MASTER.csv` | **The rebuild checklist** — one row per URL with every meta field |
| `reports/seo-audit.md` | Prioritised findings: what to preserve, what to fix |
| `reports/schema-index.md` | Structured-data coverage incl. all 14 FAQPages |
| `reports/verification.md` | Proof the capture is complete |

## Layout

```
site-level/          robots.txt, all 4 sitemaps, response headers
  wp-rest/           full WordPress REST export (pages, posts, media, categories)
pages/<slug>/
  raw.html           server HTML exactly as delivered — authoritative for meta + JSON-LD
  rendered.html      post-JavaScript DOM (Firecrawl)
  content.md         clean readable content
  body-text.txt      plain text, for diffing copy after the rebuild
  meta.json          every title / meta / link-rel tag
  schema.jsonld      pretty-printed JSON-LD graph
  headings.json      full h1-h6 outline in document order
  links.json         internal vs external links
  images.json        every <img> with alt, dimensions, srcset
  wp.json            the WordPress REST record
  screenshot-desktop.png   full-page 1440px
  screenshot-mobile.png    full-page 390px
media/
  manifest.json      all media with alt text, captions, dimensions
  files/             the actual binaries, in original /wp-content/uploads/YYYY/MM/ paths
```

## How this was captured

- **Meta tags and JSON-LD** come from `raw.html`, fetched directly and parsed deterministically.
  Firecrawl's `metadata.description` was **not** trusted — it returns body text rather than the real
  tag on pages that lack one, which would have silently corrupted the backup.
- **JSON-LD** survives only in raw HTML; markdown strips `<script>` tags.
- **Screenshots** force-load every lazy image (scroll pass + `loading="eager"`) before capture,
  otherwise the site's `loading="lazy"` images render as blank placeholders.
- **Media** was cross-referenced from three sources — the REST manifest, `<img>` tags, and
  `link`/`meta`/JSON-LD references — which caught 15 assets the REST API alone would have missed,
  including the site logo SVG and the web fonts.

## Known gaps

- **3 of 289 media records** are counted by the WordPress API but not returned by it
  (attached to non-public parents). All *referenced* assets were captured.
- **6 referenced image URLs return genuine 404s** — a live-site defect, not a capture failure.
  Listed in `reports/seo-audit.md` §3.
- Google Maps iframes appear blank in screenshots (third-party embed, not part of the site's own content).
