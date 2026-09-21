import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT, SOCIAL } from '../config/site'
import { headerCta } from '../config/nav'
import {
  Calculator,
  CalendarCheck,
  FollowIcon,
  Phone,
  SOCIAL_COLORS,
  WhatsAppIcon,
  socialIcons,
} from './icons'

/**
 * Persistent Follow / Call / Book / WhatsApp / AI Analysis bar, pinned to the
 * bottom below `lg`.
 *
 * Why it exists: the header's CTA cluster is `hidden ... lg:flex`, so on a phone
 * the only booking path is inside the hamburger drawer. Anyone reading the
 * middle of a treatment page had no one-tap way to convert.
 *
 * Hidden at `lg` and up -- the header there already carries the phone number
 * and the same Book button, DesktopWhatsAppButton covers WhatsApp/Follow, and
 * a second fixed copy would just be noise.
 *
 * Constraints shape the markup:
 *
 *   1. Links always render; only the Follow pop-up's *visibility* is gated by
 *      state. scripts/verify-seo.mjs's nav-link check only scrapes the
 *      prerendered <header> and <footer> -- this bar sits outside both, so it
 *      was never in that check's crawl surface either way -- but the same
 *      "always mount, hide with CSS" pattern Header.tsx's drawer and
 *      DesktopWhatsAppButton's own fan-out already use is kept here too, so a
 *      screen reader or crawler that does walk the DOM still finds every link.
 *   2. z-30, deliberately. The ladder is header/drawer z-50, drawer scrim z-40.
 *      Sitting under the scrim means an open drawer dims this bar and swallows
 *      its taps for free, with no shared state between the two components.
 *      The Follow pop-up's own outside-tap backdrop sits at z-20, below the
 *      bar so the bar stays tappable while the backdrop closes the pop-up.
 *      It renders as `<nav>`'s SIBLING, not its child -- `<nav>` carries
 *      `backdrop-blur`, and `backdrop-filter` establishes a containing block
 *      for `fixed` descendants (same rule as `filter`/`transform`), so a
 *      `fixed inset-0` backdrop nested inside `<nav>` would only ever cover
 *      `<nav>`'s own small box, not the viewport.
 *   3. No drop shadow. The Folixa kit is shadow-free and tailwind.config.js
 *      ships no shadow scale, so glow effects are reproduced as a white
 *      `ring` halo instead.
 */

/** The four outer cells. min-h clears the 44px tap target with room to spare. */
const CELL =
  'flex min-h-[64px] flex-col items-center justify-center gap-1 font-head text-[0.6875rem] font-semibold text-secondary transition-colors duration-300 active:text-primary'

export default function StickyActionBar() {
  const [isFollowOpen, setIsFollowOpen] = useState(false)

  return (
    <Fragment>
      {isFollowOpen && (
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => setIsFollowOpen(false)}
          className="fixed inset-0 z-20 lg:hidden"
        />
      )}

      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-base/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        <ul className="grid grid-cols-5">
          <li className="relative">
            {/*
              w-full is load-bearing here in a way it isn't on the <a> cells
              below: unlike a block-level element, a <button> with `flex` does
              not stretch to fill its grid column on its own -- it sizes to
              its content -- so without it Follow renders shrink-to-fit and
              left-aligned instead of centered in its column like its siblings.
            */}
            <button
              type="button"
              aria-expanded={isFollowOpen}
              aria-label="Follow Neo Follicle on social media"
              onClick={() => setIsFollowOpen((open) => !open)}
              className={`w-full ${CELL}`}
            >
              <FollowIcon className="h-5 w-5" />
              Follow
            </button>

            {isFollowOpen && (
              <ul className="absolute bottom-full left-0 z-30 mb-2 flex gap-2 rounded-full bg-base p-2 ring-1 ring-line">
                {SOCIAL.footerProfiles.map((profile) => {
                  const Icon = socialIcons[profile.label]

                  return (
                    <li key={profile.label}>
                      <a
                        href={profile.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow Neo Follicle on ${profile.label}`}
                        title={profile.label}
                        className={`grid h-10 w-10 place-items-center rounded-full text-base transition-[filter] duration-300 hover:brightness-95 ${
                          SOCIAL_COLORS[profile.label] ?? 'bg-primary hover:bg-primary-dark'
                        }`}
                      >
                        {Icon && <Icon className="h-5 w-5" />}
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}
          </li>

          <li>
            <a href={CONTACT.phoneHref} className={CELL}>
              <Phone className="h-5 w-5" />
              Call
            </a>
          </li>

          <li>
            {/*
              The circle overhangs the bar's top edge on a negative margin
              rather than `absolute`, so the label below it still flows
              normally and the cell keeps the same height as its neighbours.
            */}
            <Link
              to={headerCta.to}
              aria-label={headerCta.label}
              className="flex min-h-[64px] flex-col items-center justify-center gap-1 font-head text-[0.6875rem] font-semibold text-primary"
            >
              <span className="-mt-9 grid h-16 w-16 place-items-center rounded-full bg-primary text-base ring-[6px] ring-base transition-colors duration-300 active:bg-primary-dark">
                <CalendarCheck className="h-7 w-7" />
              </span>
              Book
            </Link>
          </li>

          <li>
            <a
              href={CONTACT.whatsapp}
              rel="noopener noreferrer"
              target="_blank"
              className={CELL}
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </a>
          </li>

          <li>
            <Link
              to="/ai-hair-transplant-cost-calculator/"
              aria-label="AI Hair Analysis & Hair Transplant Cost Calculator"
              className={CELL}
            >
              <Calculator className="h-5 w-5" />
              AI Analysis
            </Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  )
}
