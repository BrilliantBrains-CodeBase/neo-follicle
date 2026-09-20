import ThankYouPanel from '../components/ThankYouPanel'
import { BOOK, CALL } from '../content/treatments/ctas'

/**
 * /nft-brochure-thank-you/ -- the brochure funnel's confirmation step.
 *
 * NO GENERATED MARKER, DELIBERATELY -- see the note in thank-you-lp.tsx.
 *
 * Indexed and in the sitemap (unlike thank-you-lp), which is the captured
 * state and is asserted. That is unusual for a thank-you page, but it is not
 * ours to change here: src/seo/pages.ts is frozen against the capture.
 *
 * COPY: neofollicle-seo-backup/pages/nft-brochure-thank-you/ -- the capture's
 * three h2s and its h3, verbatim. The capture has no h1, so "Thank You" is
 * promoted from its first h2 to be the page's one h1; the trailing full stop
 * the capture wrote ("Thank You.") is dropped, as it is the page heading now
 * rather than a sentence.
 */
export default function NftBrochureThankYou() {
  return (
    <ThankYouPanel
      heading="Thank You"
      lines={[
        'We have sent the NFT Brochure download link to your email.',
        'Please click the same to download the brochure.',
      ]}
      note="Please call +91 - 97312 07940 for an appointment with our Senior Hair Transplant Surgeon, Dr Sandeep Mahapatra."
      ctas={[CALL, BOOK]}
    />
  )
}
