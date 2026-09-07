import { useState } from 'react'
import type { FormEvent } from 'react'
import { CONTACT, FORMS } from '../config/site'
import { ChevronDown, MailIcon, MapPinIcon, PhoneIcon, Square } from './icons'
import Reveal from './Reveal'

/**
 * Contact Us -- and the content doc's SECTION 13 Final CTA. One section serves
 * both: the doc has no separate "Contact Us" homepage block, and stacking a
 * Final CTA band next to a contact form would put two near-identical asks at
 * the page end. So the heading and body copy are SECTION 13 verbatim, laid out
 * in the Folixa reference's Contact Us geometry.
 *
 * Design ported from the reference's CONTACT page, not its home page -- Folixa's
 * home has no contact block. Elementor container `0a99974` on post-35; the
 * visual target is
 * folixa-design-reference/pages/contact/sections/03-contact-us.png. Values are
 * resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-35.css
 * (the section and its cards) and ...post-1132.css (the metform template that
 * supplies the field and button styling).
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js: Elementor desktop -> `lg:`, its tablet band (768-1024)
 * -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Deliberate departures from the reference:
 *
 *   - A phone field, making five inputs against the reference's four. This is
 *     an India-market medical lead form where the clinic calls back, and every
 *     CTA in the content doc is phone- or WhatsApp-first ("Call +91 97312
 *     07940", "WhatsApp Us"), so an email-only lead is close to useless.
 *   - A native <select> with `appearance-none` and an absolutely positioned
 *     ChevronDown, in place of the reference's react-select widget. That is one
 *     runtime dependency the app does not have; the app's only ones are react
 *     and react-router.
 *   - Real <label>s, screen-reader only. The reference is placeholder-only,
 *     which leaves a filled field with no accessible name. The placeholders are
 *     kept as the visible hint, so the design is unchanged.
 *   - The address, phone and email cards are <a>s in the reference too, but its
 *     hrefs are all "#". Ours point at the map, the dialer and mailto.
 *   - All three card labels are 16px/1.3em -- the size the reference reserves
 *     for its address (`29e7fa2`), while giving phone and email the h5 token.
 *     Its values are short ("hello@folixa.com", "(+1) 234 567 8900"); ours are
 *     a 30-character email and a spaced +91 number, and at h5 in a half-width
 *     card the email overflowed and the phone broke mid-number.
 */

/**
 * The kit's card hover, at the -3px this section uses (container `7a2c3d5`)
 * rather than Process's -8px float. Transition is the reference's 0.5s.
 *
 * `motion-safe:hover:` rather than the `hover:` + `motion-reduce:transform-none`
 * pairing used elsewhere in this codebase. That pairing does not actually work:
 * `.motion-reduce\:transform-none` is specificity 0,1,0 and cannot override
 * `.hover\:-translate-y-\[3px\]:hover` at 0,2,0, so the lift still ran for
 * reduced-motion visitors. Gating the hover on `motion-safe` means the rule is
 * never emitted for them, so there is nothing to override.
 */
const CARD_LIFT = 'transition duration-500 ease-out motion-safe:hover:-translate-y-[3px]'

/**
 * Info-card geometry, shared by all three. Only the background differs, so that
 * is applied at the call site: `accent` for the address, `surface` for the rest.
 * Padding 1rem and gap 0.75rem are `7a2c3d5`; the gap opens to 1rem on tablet.
 */
const INFO_CARD = `flex items-center gap-3 rounded p-4 md:gap-4 ${CARD_LIFT}`

/**
 * The icon tile: a 28px glyph in 0.4em of padding, so a ~50px square. The glyph
 * is `secondary` on every card -- this section, like Process, is an exception to
 * the kit's primary-blue icons.
 */
const ICON_TILE = 'flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded'

/**
 * Field styling from post-1132.css: white ground, 14px/20px padding, 4px radius.
 * The reference draws no resting border -- the white input on the card's
 * `surface` ground is the whole affordance -- but it has no visible focus state
 * either, so a `primary` focus ring is added. #979797 is its placeholder colour.
 */
const FIELD =
  'w-full rounded-sm bg-base px-5 py-[14px] text-body text-black placeholder:text-[#979797] outline-none ring-1 ring-transparent transition focus-visible:ring-primary'

/** SECTION 4's procedures, plus the two escape hatches a lead form needs. */
const SERVICES = [
  'Hair Transplant for Men',
  'Female Hair Transplant',
  'Beard Transplant',
  'Eyebrow Restoration',
  'Failed Hair Transplant Repair',
  'Unshaven & Body Hair Transplant',
  'Non-Surgical Treatment (GFC, PRP, QR678)',
  'Not sure yet',
]

const INFO = [
  {
    icon: MapPinIcon,
    href: CONTACT.mapUrl,
    external: true,
    label: 'Clinic address, opens in Google Maps',
    /** Joined on one line -- the reference's address heading is 16px/1.3em. */
    text: CONTACT.addressLines.join(' ').replace(/,$/, ''),
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
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactUs() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    // No Apps Script deployed yet -- hand the lead to WhatsApp rather than drop
    // it. Delete this branch once FORMS.leadEndpoint is set.
    if (!FORMS.leadEndpoint) {
      const lines = [
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        data.email && `Email: ${data.email}`,
        data.service && `Interested in: ${data.service}`,
        data.message && `Message: ${data.message}`,
      ].filter(Boolean)

      window.open(
        `${CONTACT.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`,
        '_blank',
        'noopener',
      )
      setStatus('sent')
      form.reset()
      return
    }

    setStatus('sending')
    try {
      // `text/plain` keeps this a CORS simple request. See FORMS.leadEndpoint.
      const response = await fetch(FORMS.leadEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error(String(response.status))
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:flex-row lg:items-start lg:gap-gap">
        {/* Left column -- copy, then the three info cards. */}
        <Reveal className="flex flex-col gap-6 lg:flex-1">
          {/* On this white ground the mark is `primary` and the label body colour,
              the same pairing Services uses. */}
          <p className="flex items-center gap-[5px] font-head text-h6 text-body">
            <Square className="h-[14px] w-[14px] shrink-0 text-primary" />
            Contact Us
          </p>

          <h2 className="text-balance font-head text-h2 text-secondary">
            Start Your Hair Restoration Journey Today
          </h2>

          {/* SECTION 13 body, verbatim. 533px is the reference's `2c79206`. */}
          <p className="text-body lg:max-w-[533px]">
            Whether it is hair fall, a receding hairline, baldness, a patchy beard, thin eyebrows or
            a previous transplant that did not work, the first step is a proper diagnosis. Book a
            consultation and get a clear, honest plan for your hair.
          </p>

          {/*
            `703738a`: two columns with the address spanning both, collapsing to
            one column on mobile. Pushed down with `mt-auto` so the cards sit at
            the foot of the column, level with the form's button on desktop.
          */}
          <ul className="mt-2 grid grid-cols-1 gap-gap-sm md:grid-cols-2 lg:mt-auto lg:gap-6">
            {INFO.map(({ icon: Icon, href, external, label, text }, i) => (
              <li key={href} className={i === 0 ? 'md:col-span-2' : undefined}>
                <a
                  href={href}
                  aria-label={label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`${INFO_CARD} group ${i === 0 ? 'bg-accent' : 'bg-surface'}`}
                >
                  {/* White tile on the tinted card, `surface` on the plain ones --
                      the reference inverts the two grounds, card against tile. */}
                  <span className={`${ICON_TILE} ${i === 0 ? 'bg-base' : 'bg-surface'}`}>
                    <Icon className="h-7 w-7 text-secondary" />
                  </span>
                  <span className="min-w-0 break-words font-head text-[16px] font-semibold leading-[1.3em] text-body transition-colors group-hover:text-primary">
                    {text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right column -- the form card, `4b9a3f4`. */}
        <Reveal
          delay={200}
          className="rounded border border-[#D6D6D633] bg-surface p-5 md:p-6 lg:flex-1 lg:p-8"
        >
          {/* `36840be`: one column, 1.5rem row gap. */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="contact-name" className="sr-only">
                Your name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                className={FIELD}
              />
            </div>

            <div>
              <label htmlFor="contact-phone" className="sr-only">
                Phone number
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                required
                inputMode="tel"
                autoComplete="tel"
                placeholder="Phone number"
                className={FIELD}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="sr-only">
                Email address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="example@mail.com"
                className={FIELD}
              />
            </div>

            <div className="relative">
              <label htmlFor="contact-service" className="sr-only">
                Select service
              </label>
              <select
                id="contact-service"
                name="service"
                defaultValue=""
                className={`${FIELD} appearance-none pr-12`}
              >
                {/* Not `disabled` -- "select service" is a valid answer on a form
                    whose whole premise is that the diagnosis comes first. */}
                <option value="">select service</option>
                {SERVICES.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-5 top-1/2 h-3 w-3 -translate-y-1/2 text-[#979797]"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="sr-only">
                Your message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="tell us in details you want to say"
                className={`${FIELD} resize-y`}
              />
            </div>

            {/* `1fb474e`: left-aligned on desktop, full width on mobile. */}
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex w-full items-center justify-center rounded-[5px] bg-primary px-6 py-4 font-head text-button text-white transition duration-500 hover:bg-primary-dark disabled:opacity-60 md:w-auto md:self-start"
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>

              <p aria-live="polite" className="text-body">
                {status === 'sent' &&
                  'Thank you. We have your details and the clinic will call you back.'}
                {status === 'error' && (
                  <span>
                    Something went wrong. Please{' '}
                    <a href={CONTACT.phoneHref} className="text-primary underline">
                      call {CONTACT.phoneDisplay}
                    </a>{' '}
                    or{' '}
                    <a
                      href={CONTACT.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      message us on WhatsApp
                    </a>
                    .
                  </span>
                )}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
