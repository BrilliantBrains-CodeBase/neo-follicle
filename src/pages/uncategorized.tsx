import BlogListing from '../components/BlogListing'


/**
 * /category/uncategorized/ -- WordPress's default category archive.
 *
 * On the old site this was a byte-for-byte duplicate of /our-blogs/: the same
 * 12 cards in the same order, and even the same `<h1>Our Blogs</h1>`. A diff of
 * the two captures in neofollicle-seo-backup/pages/ differs in three lines, all
 * of them pager and footer hrefs.
 *
 * neofollicle-seo-backup/reports/seo-audit.md is unambiguous that it should go:
 * P3 says "Do not migrate sample-page, maintenance-page, uncategorized", it has
 * zero inbound internal links, no meta description, and it competes with
 * /our-blogs/ for the same content.
 *
 * It cannot go yet. The URL is in 01-SEO-MASTER.csv and in
 * site-level/sitemap-taxonomy-category.xml, so scripts/verify-seo.mjs checks 1
 * and 9 require this route to render. Removing it means editing the backup CSV
 * and regenerating, which moves the gate's expected counts -- a separate change,
 * so that an SEO regression stays distinguishable from a design one.
 *
 * Until then it renders the listing it always did, with no pager, under the
 * section's current name. The old page's own h1 was "Our Blogs" -- the same
 * string /our-blogs/ used, since this was a duplicate of it -- so the two
 * tracking each other through the rename is the original behaviour, not a new
 * coupling.
 */
export default function Uncategorized() {
  return <BlogListing heading="Our Blogs" crumb="Uncategorized" paged={false} />
}
