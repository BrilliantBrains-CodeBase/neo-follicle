import { seoFor } from '../seo/pages'

/**
 * The body of every one of the 59 pages until content lands.
 *
 * The <h1> is read from src/seo/pages.ts -- it is a ported SEO signal captured
 * from the live site, not authored copy. Three pages (hair-assessment,
 * nft-brochure-thank-you, thank-you-lp) have no h1 in the capture, so none is
 * rendered for them.
 */
export default function PagePlaceholder({ slug }: { slug: string }) {
  const seo = seoFor(slug)

  return (
    <div className="container py-section-y">
      {seo.h1 && <h1 className="text-h1 font-head text-secondary">{seo.h1}</h1>}

      <p className="mt-gap-sm text-body text-body">
        Content pending. Reference capture:{' '}
        <code>neofollicle-seo-backup/pages/{seo.slug}/</code>
      </p>

      {seo.needsRewrite && (
        <p className="mt-gap-xs text-body text-body">
          Meta description needs a rewrite{seo.descFlagReason ? ` (${seo.descFlagReason})` : ''}.
        </p>
      )}
    </div>
  )
}
