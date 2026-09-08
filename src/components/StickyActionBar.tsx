import { Link } from 'react-router-dom'
import { CONTACT } from '../config/site'
import { headerCta } from '../config/nav'
import { CalendarCheck, Phone, WhatsAppIcon } from './icons'

/**
 * Persistent Call / Book / WhatsApp bar, pinned to the bottom below `lg`.
 *
 * Why it exists: the header's CTA cluster is `hidden ... lg:flex`, so on a phone
 * the only booking path is inside the hamburger drawer. Anyone reading the
 * middle of a treatment page had no one-tap way to convert.
 *
 * Hidden at `lg` and up -- the header there already carries the phone number
 * and the same Book button, and a second fixed copy would just be noise.
 *
 * Three constraints shape the markup:
 *
 *   1. No state, no effects. scripts/verify-seo.mjs reads the *prerendered*
 *      HTML, and every always-visible element in this app renders its final
 *      content on the server. Three links and two icons is all this needs.
 *   2. z-30, deliberately. The ladder is header/drawer z-50, drawer scrim z-40.
 *      Sitting under the scrim means an open drawer dims this bar and swallows
 *      its taps for free, with no shared state between the two components.
 *   3. No drop shadow. The Folixa kit is shadow-free and tailwind.config.js
 *      ships no shadow scale, so the reference's glow behind the Book button is
 *      reproduced as a white `ring` halo instead.
 */

/** Both outer cells. min-h clears the 44px tap target with room to spare. */
const CELL =
  'flex min-h-[64px] flex-col items-center justify-center gap-1 font-head text-[0.8125rem] font-semibold text-secondary transition-colors duration-300 active:text-primary'

export default function StickyActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-base/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <ul className="grid grid-cols-3">
        <li>
          <a href={CONTACT.phoneHref} className={CELL}>
            <Phone className="h-6 w-6" />
            Call
          </a>
        </li>

        <li>
          {/*
            The circle overhangs the bar's top edge on a negative margin rather
            than `absolute`, so the label below it still flows normally and the
            cell keeps the same height as its two neighbours.
          */}
          <Link
            to={headerCta.to}
            aria-label={headerCta.label}
            className="flex min-h-[64px] flex-col items-center justify-center gap-1 font-head text-[0.8125rem] font-semibold text-primary"
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
            <WhatsAppIcon className="h-6 w-6" />
            WhatsApp
          </a>
        </li>
      </ul>
    </nav>
  )
}
