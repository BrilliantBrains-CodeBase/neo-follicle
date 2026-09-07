import { Link } from 'react-router-dom'
import { ArrowRight, Square } from './icons'
import Reveal from './Reveal'

/**
 * Latest Insights -- the blog teaser band.
 *
 * Design ported from the Folixa reference, home section 12 -- Elementor
 * container `11d2a7a`, its header `0d78c58` and its post block `ffee184`
 * (jkit_post_block, `postblock-type-3`). Every value below is resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-7.css
 * and .../plugins__jeg-elementor-kit__assets__css__elements__main.css; the
 * visual target is
 * folixa-design-reference/pages/home/sections/12-helpful-guides-for-hair-transplant-patients.png.
 *
 * Copy is from content/home-page/Neo-Follicle-Website-Content.md SECTION 14.
 * The doc supplies only titles and links, so the excerpts come from each
 * guide's existing meta description in src/seo/pages.ts -- real published site
 * copy, nothing invented. See the note on GUIDES below.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Deliberate departures from the reference:
 *
 *   - The card image is the banner's own 1.91:1 aspect, not the reference's
 *     fixed `height: 300px` thumb. At the 3-up column width (~379px) a 300px
 *     box is roughly 4:3, which would crop these wide banners in half. See the
 *     note on the images below.
 *   - Card titles are <h3> carrying the `text-h5` token: the reference's SIZE
 *     (its `dfbf025` typography resolves to exactly the h5 token), but the
 *     right outline level under this section's h2 and Hero's single h1 (the
 *     doc's final recommendation 1). Same call Services and WhyNeoFollicle made.
 *   - The reference emits a nested <a> for "Read More" inside a card whose
 *     thumb and title are already links. Ours is a single <Link> around the
 *     whole card with the affordance as a <span>, so the tile is one tab stop.
 *   - No `capitalize` on the h2, though the kit's global h2 carries it. Neither
 *     Hero, Services, Process nor WhyNeoFollicle applies it either.
 *   - The eyebrow "Latest Insights" is the reference's label, not the doc's --
 *     the doc gives this section no eyebrow. It makes no claim.
 *   - `bg-surface`, not the reference's #FFFFFF. In the reference this band is
 *     white because the section above it is the dark (#1A1A1A) CTA, which does
 *     the separating. Our running order is different -- CommonQuestions and
 *     ContactUs are both `bg-base` and this sits between them -- so white here
 *     would give three unbroken white bands. `bg-surface` is the kit's own
 *     alternation device (DESIGN.md 2 and 4) and is what Process already uses.
 *
 * The kit's grid is 3-up on desktop and drops straight to ONE column at 1024
 * and below (`repeat(1, minmax(0, 1fr))`), skipping a 2-up tablet step. That is
 * the reference's own choice and is kept: three cards split 2+1 would leave an
 * orphan.
 */

/**
 * SECTION 14's guide table, verbatim. All three routes exist in src/routes.tsx.
 *
 * Excerpts are each guide's own meta description from src/seo/pages.ts, minus
 * the trailing brand-attribution sentence where there is one ("Expert guide by
 * Neo Follicle Bangalore." on the grafts guide). The doc's SECTION 14 gives no
 * card copy and the reference card carries a ~13-word excerpt, so this is the
 * only real source for that line.
 *
 * Every `img` is the guide post's OWN featured banner, out of
 * neofollicle-seo-backup/media/files/wp-content/uploads, re-encoded to webp at
 * 1200x628:
 *
 *   grafts    2026/06/How-many-grafts-do-I-need-for-hair-transplant.png
 *   failures  2026/07/Why-Hair-Transplants-Fail.png
 *   clinic    2026/06/How-to-Choose-the-Best-Hair-Transplant-Clinic-in-Bangalore.png
 *
 * The first two are 1734x907 and ship uncropped -- their artwork bleeds to all
 * four edges, so any crop clips the title rule and the doctor's byline bar. The
 * third is 1672x941 and loses 33px top and bottom to match.
 *
 * TWO POINTS FLAGGED FOR CLIENT REVIEW:
 *   - Each banner has the guide's title baked into the artwork, which the <h3>
 *     below then repeats. At card width that type is illegible and reads as
 *     texture, but it is duplication.
 *   - The three are not stylistically consistent: two are photo composites, the
 *     third is a pencil-sketch illustration.
 */
const GUIDES = [
  {
    title: 'How Many Grafts Do I Need for a Hair Transplant?',
    excerpt:
      'Learn how hair transplant grafts are calculated based on baldness stage, donor density, hair thickness, and coverage needs.',
    to: '/how-many-grafts-do-i-need-for-hair-transplant/',
    img: '/insights/grafts.webp',
  },
  {
    title: 'Why Hair Transplants Fail: Causes, Signs and Prevention',
    excerpt:
      'Learn why hair transplants fail, common warning signs, and how Neo Follicle in Bangalore protects graft survival with safe surgical protocols.',
    to: '/why-hair-transplants-fail/',
    img: '/insights/failures.webp',
  },
  {
    title: 'How to Choose the Best Hair Transplant Clinic in Bangalore',
    excerpt:
      'Learn how to choose the best hair transplant clinic in Bangalore with expert tips on surgeon involvement, safety, graft count, hygiene, cost, and red flags.',
    to: '/how-to-choose-the-best-hair-transplant-clinic-bangalore/',
    img: '/insights/clinic.webp',
  },
]

/**
 * The reference strips the kit's blue Read More button back to a bare
 * underlined link: `background-color:#02010100`, `border-width:0 0 1px 0`,
 * `border-color:#00000033` (the `overlay` token), `padding:0 0 4px 0`,
 * `margin-top:4px`. Hover takes the text to `primary` and the rule to
 * `secondary`. `text-button` is the `3c1b31e` typography exactly.
 *
 * The 4px is `pt-1` on the wrapper rather than `mt-1` here, because the wrapper
 * needs `mt-auto` to hold the rule on a common baseline across the three cards
 * -- our excerpts run to two or three lines where the reference's are all two.
 */
const READ_MORE =
  'inline-flex items-center border-b border-overlay pb-1 font-head text-button text-secondary transition-colors group-hover:border-secondary group-hover:text-primary'

export default function Insights() {
  return (
    <section className="bg-surface py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        {/* `0d78c58`: centred, 16px between the eyebrow and the h2. */}
        <Reveal className="flex flex-col items-center gap-4 text-center">
          {/* Same eyebrow as Process: plain h6 token, 5px icon gap. */}
          <p className="flex items-center gap-[5px] font-head text-h6 text-secondary">
            <Square className="h-[14px] w-[14px] shrink-0 text-primary" />
            Latest Insights
          </p>

          {/* `f80ef51` clamps to 656px on desktop and 492px at tablet. */}
          <h2 className="text-balance font-head text-h2 text-secondary md:max-w-[492px] lg:max-w-[656px]">
            Helpful Guides for Hair Transplant Patients
          </h2>
        </Reveal>

        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {GUIDES.map(({ title, excerpt, to, img }, i) => (
            <Reveal key={to} as="li" delay={i * 100}>
              <Link to={to} className="group flex h-full flex-col">
                {/*
                  alt="" is deliberate. The banner's only content is the guide's
                  title, which the <h3> below already gives the link its
                  accessible name -- describing it again would read the heading
                  twice. The standard teaser-thumbnail pattern.
                */}
                <img
                  src={img}
                  alt=""
                  width={1200}
                  height={628}
                  loading="lazy"
                  className="aspect-[1200/628] w-full shrink-0 rounded object-cover"
                />

                {/* Thumb margin-bottom 1.5rem against the title's -8px = 16px. */}
                <h3 className="mt-4 font-head text-h5 text-secondary">{title}</h3>
                <p className="mt-4 text-body">{excerpt}</p>

                <span className="mt-auto block pt-1">
                  <span className={READ_MORE}>
                    Read More
                    <ArrowRight className="ml-[5px] h-4 w-4" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
