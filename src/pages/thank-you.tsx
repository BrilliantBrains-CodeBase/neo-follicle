import ThankYouPanel from '../components/ThankYouPanel'
import { ANALYSIS, CALL } from '../content/treatments/ctas'

/**
 * /thank-you/ -- where the home and /contact-us/ forms land once the lead is
 * in the sheet (ContactUs `successTo`). One URL for every site-form conversion,
 * so ads and analytics can count it as a page view rather than a JS event.
 * The brochure form keeps its own /nft-brochure-thank-you/, which promises an
 * email this page must not.
 *
 * NO GENERATED MARKER, DELIBERATELY -- see the note in thank-you-lp.tsx.
 *
 * AUTHORED, NOT CAPTURED: the SEO record is content/seo/thank-you.json. It is
 * noindex, has no canonical and is not in the sitemap, like thank-you-lp -- a
 * confirmation page is only ever reached by converting.
 *
 * CTAs are Call and AI Hair Analysis, not Book: the visitor just booked.
 */
export default function ThankYou() {
  return (
    <ThankYouPanel
      heading="Thank You"
      lines={['We have received your details. Our team will call you back shortly to plan your consultation.']}
      note="Want to talk sooner? Call us during clinic hours, or take the free AI hair analysis while you wait."
      ctas={[CALL, ANALYSIS]}
    />
  )
}
