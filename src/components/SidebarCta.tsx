import { Link } from 'react-router-dom'
import { headerCta } from '../config/nav'

/**
 * The sidebar booking card.
 *
 * Design ported from the Folixa reference single post -- Elementor card
 * `2b85fe1`. Values from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-33.css.
 * This is the only accent-tinted card in the kit, which is what makes it read
 * as the one action on the page:
 *
 *   card    accent #E2ECFF, 1px overlay #00000033, padding 2rem
 *           radius 0.5rem, widening to 1rem at mobile
 *   heading h4 token, secondary
 *   body    body token
 *   button  primary, going to secondary #1A1A1A on hover at 0.5s,
 *           full-width at mobile
 *
 * Copy is authored -- the reference's is theme filler. It makes no outcome
 * claim. FLAGGED FOR CLIENT REVIEW, same precedent as BlogCta.
 */

export default function SidebarCta() {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-overlay bg-accent p-8 md:rounded-lg">
      <h2 className="font-head text-h4 text-secondary">Ready to Restore Your Hair Growth?</h2>
      <p className="text-body">
        Book a consultation with Dr Sandeep Mahapatra to find out what is causing your hair loss and
        what can be done about it.
      </p>
      <Link
        to={headerCta.to}
        className="mt-4 inline-flex w-full items-center justify-center rounded bg-primary p-4 font-head text-button text-base transition-colors duration-500 hover:bg-secondary md:w-auto md:self-start"
      >
        {headerCta.label}
      </Link>
    </section>
  )
}
