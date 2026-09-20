import LegalPage from '../components/LegalPage'
import blocks from '../content/legal/terms-of-use'
import { seoFor } from '../seo/pages'

/**
 * /terms-of-use/ -- footer-linked, indexed, in the sitemap.
 *
 * NO GENERATED MARKER, DELIBERATELY -- see the note in privacy-policy.tsx.
 *
 * The body is VERBATIM legal text from the capture, parsed by
 * scripts/gen-legal.mjs into src/content/legal/terms-of-use.ts. Do not edit
 * the copy here or there -- regenerate it.
 */
export default function TermsOfUse() {
  return (
    <LegalPage
      title={seoFor('terms-of-use').h1 ?? 'Terms of Use'}
      crumb="Terms Of Use"
      blocks={blocks}
    />
  )
}
