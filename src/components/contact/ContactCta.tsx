import { CONTACT, LEGAL } from '../../config/site'
import { Phone, WhatsAppIcon } from '../icons'

/**
 * Content doc PAGE 5 SECTION 6, the closing call to action, plus the medical
 * disclaimer.
 *
 * Design is the kit's universal page-closer, identical to DoctorCta and
 * TreatmentsCta -- Elementor container `13b042c` with its inner card
 * `01f5e72`: min-height 550px (500 tablet / 450 mobile), radius 8px, padding
 * 20px, centred column, /footer-bg.webp under `secondary` at opacity 0.8.
 * Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-21.css.
 * The Folixa appointment page's own closer (`259be9f`) is the same block.
 *
 * TWO BUTTONS, AND NEITHER IS "BOOK APPOINTMENT". Every other closing band on
 * the site leads with Book Appointment -> /contact-us/. On /contact-us/ that
 * is a self-link, and it would sit a few hundred pixels below a booking form
 * that already does the job. The doc's SECTION 6 lists exactly Call Now and
 * WhatsApp, which is also the right ask here: the visitor who scrolled past
 * the form without filling it wants to talk to someone now.
 *
 * The heading is an <h2>. The page's <h1> belongs to PageBanner.
 *
 * THE DISCLAIMER RIDES HERE rather than in Footer. LEGAL.disclaimer is
 * transcribed from neofollicle-seo-backup/pages/contact-us/content.md, where
 * it closed the captured page, and it is required on medical marketing pages.
 * Footer does not render it, so dropping it would lose content the live page
 * carries. It sits outside the dark card, on the section's own ground, so it
 * reads as legal small print rather than as part of the ask.
 *
 * `text-base` is ambiguous here (Tailwind font size vs the `base` colour
 * token), so white text uses `text-white`.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:transform-none'

/** The kit's single button geometry: radius 0.5rem, padding 1rem. */
const BUTTON = `inline-flex w-full items-center justify-center gap-2 rounded p-4 font-head text-button duration-500 md:w-auto ${FLOAT}`

export default function ContactCta() {
  return (
    <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-sm">
        <div className="relative isolate flex min-h-[450px] flex-col items-center justify-center gap-6 overflow-hidden rounded p-5 text-center md:min-h-[500px] lg:min-h-[550px]">
          <img
            src="/footer-bg.webp"
            alt=""
            width={1920}
            height={1080}
            loading="lazy"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          />
          {/* The reference's overlay: `secondary` at --overlay-opacity:0.8. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-secondary opacity-80" />

          <h2 className="text-balance font-head text-h2 text-white animate-fadeInUp motion-reduce:animate-none lg:max-w-[760px]">
            Your Hair Restoration Journey Starts with One Conversation
          </h2>

          <p className="text-body text-white/90 animate-fadeInUp motion-reduce:animate-none lg:max-w-[600px]">
            Call the appointment desk or message us on WhatsApp, and we will find you a slot with
            Dr. Sandeep Mahapatra.
          </p>

          <div className="mt-2 flex w-full flex-wrap justify-center gap-gap-sm animate-fadeInUp motion-reduce:animate-none md:w-auto">
            {/* tel: and wa.me are not routes, so plain anchors rather than Links. */}
            <a
              href={CONTACT.phoneHref}
              className={`${BUTTON} bg-primary text-white hover:bg-white hover:text-secondary`}
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`${BUTTON} border border-white/70 text-white/70 hover:border-white hover:text-white`}
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </a>
          </div>
        </div>

        <p className="text-[14px] leading-[1.6em] text-body/70">{LEGAL.disclaimer}</p>
      </div>
    </section>
  )
}
