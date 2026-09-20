import { CONTACT } from '../config/site'
import { CheckCircle, ClockIcon, MapPinIcon, PhoneIcon } from './icons'
import Reveal from './Reveal'
import { BUTTON, CtaRow } from './treatment/shell'
import type { Cta } from '../content/treatments/types'

/**
 * The confirmation panel, shared by /thank-you-lp/ and /nft-brochure-thank-you/.
 *
 * WHY ONE COMPONENT FOR TWO PAGES. Both captures are the same object with
 * different words: a "Thank You" headline, a line saying what will arrive and
 * when, a line saying someone will call, and the clinic's address and phone.
 * Their whole captured bodies are ~310 words each and about 90% of that is the
 * site's own nav and footer chrome -- the real content is what is below.
 *
 * BOTH PAGES ARE `noindex` OR TERMINAL. thank-you-lp is one of the six ad
 * landing pages (no canonical, not in the sitemap -- that captured state is
 * asserted by scripts/verify-seo.mjs); nft-brochure-thank-you is the brochure
 * funnel's last step. Neither is a page anyone arrives at cold, so there is no
 * hero, no banner photograph and no sales section: the visitor has already
 * converted, and the job is to confirm it and tell them what happens next.
 *
 * THE ONE JOB BEYOND CONFIRMATION is to keep the visitor moving -- hence the
 * address, the hours and a call button. The captured pages carry exactly that
 * and nothing else.
 *
 * NO <h1> IS RENDERED HERE. The page supplies it, so a caller cannot
 * accidentally end up with two. See the note in each page file.
 */
export default function ThankYouPanel({
  heading,
  lines,
  note,
  ctas,
}: {
  /** The page's only <h1> -- e.g. "Thank You". */
  heading: string
  /** What will arrive and when. One <p> each, in order. */
  lines: string[]
  /** The smaller line under them, e.g. "One of our team will contact you shortly." */
  note?: string
  ctas: Cta[]
}) {
  return (
    <section className="bg-surface py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container">
        <Reveal className="mx-auto flex max-w-[760px] flex-col items-center gap-6 rounded-lg border border-line bg-base p-6 text-center md:p-10">
          {/* Decorative: the heading beside it already says "Thank You". */}
          <span
            aria-hidden="true"
            className="flex h-16 w-16 items-center justify-center rounded-pill bg-accent"
          >
            <CheckCircle className="h-8 w-8 text-primary" />
          </span>

          <h1 className="text-balance font-head text-h2 text-secondary">{heading}</h1>

          {lines.map((line) => (
            <p key={line} className="max-w-[60ch] text-body-lg text-body">
              {line}
            </p>
          ))}

          {note && <p className="max-w-[60ch] text-body text-body">{note}</p>}

          <div className="mt-2">
            <CtaRow ctas={ctas} center />
          </div>
        </Reveal>

        {/*
          The captured pages close with the clinic's address and an appointment
          line. Kept, because a visitor who has just booked is the one most
          likely to want directions -- and dropped to a quieter card so it
          reads as reference, not as a second CTA.
        */}
        <Reveal className="mx-auto mt-gap-mobile grid max-w-[760px] gap-gap-sm md:mt-gap-tablet md:grid-cols-3">
          <div className="flex flex-col gap-2 rounded border border-line bg-base p-5">
            <MapPinIcon className="h-5 w-5 text-primary" />
            <h2 className="font-head text-h6 text-secondary">Our Clinic Address</h2>
            <address className="not-italic text-body">
              {CONTACT.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div className="flex flex-col gap-2 rounded border border-line bg-base p-5">
            <PhoneIcon className="h-5 w-5 text-primary" />
            <h2 className="font-head text-h6 text-secondary">Book an Appointment</h2>
            <a
              href={CONTACT.phoneHref}
              className="text-body text-primary transition hover:text-primary-dark"
            >
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="break-words text-body text-primary transition hover:text-primary-dark"
            >
              {CONTACT.email}
            </a>
          </div>

          <div className="flex flex-col gap-2 rounded border border-line bg-base p-5">
            <ClockIcon className="h-5 w-5 text-primary" />
            <h2 className="font-head text-h6 text-secondary">Clinic Hours</h2>
            {/* Tuesday is deliberately absent -- see the note on CONTACT.openingHours. */}
            <p className="text-body">{CONTACT.openingHoursDisplay}</p>
            <p className="text-body">{CONTACT.closedDayDisplay}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Exported so the brochure page can match the panel's button sizing. */
export { BUTTON }
