import { CONTACT } from '../../config/site'
import ContactUs from '../ContactUs'
import type { InfoCard } from '../ContactUs'
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from '../icons'

/**
 * Content doc PAGE 5 SECTIONS 1-3 and 5, in one band.
 *
 * Design ported from the Folixa reference's APPOINTMENT page, section 3 --
 * Elementor container `b3ac8a0`, a two-column row with the copy and contact
 * cards left and the booking form panel right. Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-37.css;
 * the visual target is
 * folixa-design-reference/pages/appointment/sections/03-book-your-appointment.png.
 *
 * The geometry itself lives in ContactUs, which already ports the reference's
 * CONTACT page (post-35) form and card cluster. The two reference pages lay
 * this band out the same way; only the copy and the card count differ. So this
 * component is copy, not layout -- see the ContactUs docblock for why there is
 * one form rather than two.
 *
 * FOUR CARDS, not the reference appointment page's two. The doc's SECTION 2
 * lists Call, Email and Address, and its SECTION 3 is a clinic-hours table. A
 * fourth card is a cheaper home for one row of hours than its own band, and it
 * puts every "can I actually get there, and when" fact in one place.
 *
 * THE HOURS ARE THE JSON-LD'S, NOT THE DOC'S. The doc says "All Days, 10 AM -
 * 8 PM". src/seo/schema/contact-us.json -- which scripts/prerender.mjs injects
 * into this very page's <head>, and which scripts/verify-seo.mjs asserts
 * byte-for-byte against the capture -- says Monday, Wednesday, Thursday,
 * Friday, Saturday and Sunday, 10:00 to 19:00, with Tuesday absent because the
 * clinic is closed. Rendering the doc's line would ship visible hours that
 * contradict the page's own structured data, which is an inconsistent-NAP
 * signal and, more to the point, would send patients to a shut clinic on a
 * Tuesday. CONTACT.openingHoursDisplay wins until the client confirms
 * otherwise; if the doc is right, site.ts, the graph AND the backup baseline
 * all have to move together.
 */

const INFO: InfoCard[] = [
  {
    icon: MapPinIcon,
    href: CONTACT.mapUrl,
    external: true,
    label: 'Clinic address, opens in Google Maps',
    text: CONTACT.addressLines.join(' ').replace(/,$/, ''),
    wide: true,
  },
  {
    icon: PhoneIcon,
    href: CONTACT.phoneHref,
    external: false,
    label: 'Call the clinic',
    text: CONTACT.phoneDisplay,
  },
  {
    icon: MailIcon,
    href: `mailto:${CONTACT.email}`,
    external: false,
    label: 'Email the clinic',
    text: CONTACT.email,
  },
  {
    icon: ClockIcon,
    /* No href. See the InfoCard docblock. */
    text: CONTACT.openingHoursDisplay,
    note: CONTACT.closedDayDisplay,
    wide: true,
  },
]

export default function ContactBooking() {
  return (
    <ContactUs
      eyebrow="Book an Appointment"
      /* SECTION 1's hero line. The page's <h1> is "Contact Us", the string
         /contact-us/ already ranks with, so this is the h2 ContactUs renders. */
      heading="Visit Neo Follicle Hair Transplant Clinic"
      lede="Whether you are visiting from Bangalore or overseas, our team is here to help you take the next step toward personalized hair restoration."
      /* SECTION 5's button label, verbatim. */
      submitLabel="Book Consultation"
      showCountry
      info={INFO}
    />
  )
}
