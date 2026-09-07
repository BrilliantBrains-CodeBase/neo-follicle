import { Link } from 'react-router-dom'
import { footerColumns, footerNav } from '../config/nav'
import { ASSETS, CONTACT, DOCTOR, SOCIAL, copyrightLine } from '../config/site'
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon, socialIcons } from './icons'

/**
 * Design ported from the Folixa reference footer, Elementor template post-1736
 * (folixa-design-reference/pages/home/sections/13-section-13.png). Three bands
 * separated by 1px #FFFFFF33 rules: brand + contact, four content columns, then
 * the legal bar. Copy comes from content/home-page/Neo-Follicle-Website-Content.md
 * SECTION 15 and the constants in config/site.ts.
 *
 * Two deliberate departures from the reference:
 *
 *   - Folixa's newsletter form (metform post-551) is replaced by the booking
 *     CTA pair. There is no subscribe backend, and the original Neo Follicle
 *     footer used this slot for an appointment CTA. The pill geometry is kept.
 *   - Hours render CONTACT.openingHoursDisplay (closed Tuesday), NOT the
 *     content doc's "10 am to 8 pm, all days". The two disagree; the indexed
 *     openingHoursSpecification wins. See the note in config/site.ts.
 *
 * Renders SOCIAL.footerProfiles (the set the live footer linked), NOT
 * SOCIAL.schemaSameAs -- the two disagree, see the note in config/site.ts.
 *
 * `text-base` is ambiguous here (Tailwind font size vs the `base` color token),
 * so white text uses `text-white` throughout.
 */

const linkClass = 'text-body text-white/80 transition-colors hover:text-accent'
const headingClass = 'font-head text-h6 text-white'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-secondary">
      {/*
        post-1736 paints BG-Shape.webp under a #1A1A1A overlay at
        --overlay-opacity:0.99, so the pattern reads as a faint texture rather
        than an image. Same result, one layer instead of two.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/footer-bg.webp')] bg-cover bg-center bg-no-repeat opacity-[0.07]"
      />

      <div className="container relative flex flex-col gap-gap-tablet pb-10 pt-16">
        {/* Band 1 -- brand + contact */}
        <div className="flex flex-wrap items-center justify-between gap-gap-mobile">
          <Link to="/" className="shrink-0">
            <img
              src={ASSETS.logo}
              alt="Neo Follicle Hair Transplant Clinic"
              width={172}
              height={65}
              className="h-14 w-auto invert mix-blend-screen"
            />
          </Link>

          <div className="flex flex-wrap items-center gap-gap-mobile">
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-3 font-head text-h6 text-line transition-colors hover:text-accent"
            >
              <PhoneIcon className="h-5 w-5 shrink-0" />
              {CONTACT.phoneDisplay}
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-3 font-head text-h6 text-line transition-colors hover:text-accent"
            >
              <MailIcon className="h-5 w-5 shrink-0" />
              {CONTACT.email}
            </a>
          </div>
        </div>

        <hr className="border-white/20" />

        {/* Band 2 -- four columns */}
        <div className="flex flex-col gap-gap-mobile md:grid md:grid-cols-2 lg:grid-cols-[2fr_1fr_1.05fr_1.2fr] lg:gap-8">
          <div className="flex flex-col gap-6">
            <p className="text-body text-line">
              Neo Follicle is a doctor-led hair transplant and hair loss clinic in Marathahalli,
              Bangalore. Every case is diagnosed, designed and performed under Dr. Sandeep
              Mahapatra, a senior dermatologist and hair transplant surgeon.
            </p>

            <div className="flex flex-col gap-4">
              <p className="font-head text-h5 text-white/85">
                Start Your Hair Restoration Journey Today
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact-us/"
                  className="inline-flex items-center justify-center rounded-pill bg-primary px-6 py-4 font-head text-button text-white transition-colors hover:bg-white hover:text-secondary"
                >
                  Book Your Consultation
                </Link>

                <a
                  href={CONTACT.whatsapp}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-pill border border-white/30 px-6 py-4 font-head text-button text-white transition-colors hover:border-accent hover:text-accent"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title ?? undefined} className="flex flex-col gap-6">
              <span className={headingClass}>{col.title}</span>

              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* NAP block -- keep identical to the address in the JSON-LD graph. */}
          <div className="flex flex-col gap-6">
            <span className={headingClass}>Visit Us</span>

            <address className="flex items-start gap-3 not-italic">
              <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-line" />
              <a
                href={CONTACT.mapUrl}
                rel="noopener noreferrer"
                target="_blank"
                className="text-body text-white/80 transition-colors hover:text-accent"
              >
                {CONTACT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </a>
            </address>

            <div className="flex items-start gap-3">
              <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-line" />
              <p className="text-body text-white/80">
                <span className="block">{CONTACT.openingHoursDisplay}</span>
                <span className="block">{CONTACT.closedDayDisplay}</span>
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {SOCIAL.footerProfiles.map((profile) => {
                const Icon = socialIcons[profile.label]

                return (
                  <li key={profile.label}>
                    <a
                      href={profile.href}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="flex items-center gap-3 text-body text-line transition-colors hover:text-accent"
                    >
                      <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full border border-current">
                        {Icon && <Icon className="h-[11px] w-[11px]" />}
                      </span>
                      {profile.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <hr className="border-white/20" />

        {/* E-E-A-T medical review note -- required on this YMYL site. */}
        <p className="text-body text-white/60">
          Written and medically reviewed under the guidance of{' '}
          <Link to={DOCTOR.path} className="underline transition-colors hover:text-accent">
            {DOCTOR.name}
          </Link>
          , Senior Dermatologist and Hair Transplant Surgeon at Neo Follicle, Bangalore. For patient
          education; does not replace an in-person consultation.
        </p>

        {/* Band 3 -- legal bar. Reverses to a centred stack below md, per post-1736. */}
        <div className="flex flex-col-reverse items-center gap-gap-mobile md:flex-row md:justify-between md:gap-8">
          <p className="text-center text-body text-white md:text-left">{copyrightLine()}</p>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:shrink-0 md:flex-nowrap md:justify-end"
          >
            {footerNav.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-body text-white/90 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
