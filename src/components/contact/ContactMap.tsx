import { BRAND, CONTACT } from '../../config/site'
import { ArrowRight } from '../icons'
import Reveal from '../Reveal'

/**
 * The clinic on Google Maps.
 *
 * Both sources carry a map here. The captured page has one
 * (neofollicle-seo-backup/pages/contact-us/raw.html), and the Folixa
 * reference's CONTACT page section 5 has one -- Elementor widget `0633e16`,
 * animated fadeInUp, full container width. The reference's is a London Eye
 * placeholder, so only its geometry is ported.
 *
 * THE CAPTURED IFRAME IS NOT REPRODUCED. Its `q` is the clinic name with
 * "Hairt" misspelled and three literal <br> tags URL-encoded into the query:
 *
 *   ...q=Neo+Follicle+Hairt+Transplant+Clinic%2C%3Cbr%3E1st+floor%2C...
 *
 * That is a WordPress editor artefact, not content to preserve -- nothing in
 * reports/seo-audit.md marks it PRESERVE, and a crawler reads the address from
 * the JSON-LD `#clinic` node, not from an iframe src. The query is rebuilt
 * from BRAND and CONTACT so it stays in step with the graph.
 *
 * `output=embed` needs no API key and no consent gate, which is why it is used
 * rather than the Maps Embed API.
 *
 * The "Get directions" link is not decoration. The iframe is third-party and
 * blocked outright by some corporate networks and tracker blockers; without
 * the link, a visitor who cannot load it has no way to the clinic. It points
 * at CONTACT.mapUrl, the same short link the JSON-LD `hasMap` declares.
 */

const QUERY = [
  BRAND.legalName,
  CONTACT.address.streetAddress,
  CONTACT.address.addressLocality,
  `${CONTACT.address.addressRegion} ${CONTACT.address.postalCode}`,
].join(', ')

const SRC = `https://maps.google.com/maps?q=${encodeURIComponent(QUERY)}&t=m&z=16&output=embed&iwloc=near`

export default function ContactMap() {
  return (
    <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-sm">
        <Reveal className="overflow-hidden rounded-lg border border-line">
          <iframe
            src={SRC}
            title={`${BRAND.legalName} on Google Maps`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block aspect-[4/3] w-full border-0 md:aspect-[16/9] lg:aspect-[21/9]"
          />
        </Reveal>

        <a
          href={CONTACT.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 self-start font-head text-button text-primary transition-colors hover:text-primary-dark"
        >
          Get directions
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
        </a>
      </div>
    </section>
  )
}
