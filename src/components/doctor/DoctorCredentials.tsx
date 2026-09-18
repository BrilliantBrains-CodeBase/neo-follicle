import { CheckCircle, Square } from '../icons'
import Reveal from '../Reveal'
import { DOCTOR } from '../../config/site'

/**
 * Qualifications, memberships, faculty appointments and published research.
 *
 * NOT from the content doc -- this section has no counterpart in it. It exists
 * because the page it replaces carried 2,349 words of exactly this material at
 * a URL Google has indexed since 2025, and dropping it would throw away the
 * E-E-A-T signals a YMYL medical page depends on. Retaining it was the
 * client's call.
 *
 * Sources, in order of authority:
 *   - Qualifications, awards and memberships: DOCTOR in src/config/site.ts,
 *     which is transcribed from the page's own indexed JSON-LD (`hasCredential`,
 *     `award`, `memberOf`). Rendering config rather than a second hand-copy
 *     keeps the visible page and the schema graph saying the same thing.
 *   - Faculty and research: neofollicle-seo-backup/pages/
 *     dr-sandeep-mahapatra-hair-transplant-surgeon/content.md, condensed to
 *     one line per appointment and per paper. No entry, date, venue or title
 *     is altered; only the surrounding sentences are dropped.
 *
 * Design ported from the Folixa reference, about page section 5's bordered
 * card grid -- Elementor container `0f28367`, grid `9325843`: 1px `line`
 * border, radius 8px, padding 2rem. The two long lists use native <details>,
 * which is the kit's accordion replacement per
 * folixa-design-reference/reports/components.md -- no JS, and the summary text
 * is in the prerendered HTML either way.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * CONFLICT, UNRESOLVED, INHERITED. About.tsx on the home page renders the
 * client doc's credential line, which calls Dr. Sandeep an ISHRS "Gold
 * Member"; DOCTOR.memberships, transcribed from the indexed schema, does not
 * carry that qualifier. This section shows the config wording and
 * DoctorProfile above shows the doc's, so the two differ by that one word on
 * the same page. Do not reconcile either side without the client confirming
 * which is current -- the schema graph is what Google has already read, and
 * src/seo/schema/ is frozen by scripts/verify-seo.mjs.
 *
 * The career-timeline block on the old page is deliberately NOT carried over:
 * its "Career Timeline" and "Work Experience" sections give conflicting dates
 * for the Kaya Skin Clinic post (2011-2013 against 2010-2012). Publishing a
 * contradiction is worse than publishing neither. FLAGGED FOR CLIENT REVIEW.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:transform-none'

const CARD = `flex flex-col gap-4 rounded border border-line bg-base p-8 ${FLOAT}`

/** Condensed from content.md "FACULTY FOR CONFERENCES / WORKSHOPS". */
const FACULTY = [
  'HAIRCON 2025, Kashmir and HAIRCON 2019, Indore — Association of Hair Restoration Surgeons (AHRS) of India',
  'DERMACON Jaipur 2025, Mangalore 2021, Mangalore 2017 and Coimbatore 2016 — IADVL',
  'ISHRS 32nd World Congress, Denver, Colorado, October 2024',
  'World Congress on Aesthetic Dermatology, Bangkok 2018 and Shanghai 2019',
  'EADV Congress, Milan 2019 and Geneva 2017',
  'DASIL World Congress — Dermatologic & Aesthetic Surgery International League',
  'CUTICON Karnataka 2021 — panel discussion on hair transplant techniques',
  'IADVL Torrent Dermatosurgery Workshop, Mysuru, February 2018',
  'World Congress of Cosmetic Dermatology (WCOCD) 2017 — faculty and presenter',
  'First South Zone ACS(I) Live Dermatosurgery Workshop, Bengaluru, December 2016',
]

/** Condensed from content.md "Research & Paper Presentations" and
    "Published Papers and Book Chapters". Titles are verbatim. */
const RESEARCH = [
  '“Study on the Efficacy of Platelet-Rich Fibrin Matrix in Hair Follicular Unit Transplantation in Androgenetic Alopecia Patients” — JCAD Online, 2024',
  '“Hair Transplantation Update: Complications and Best Practices” — WCD Congress, Singapore, 2023',
  '“Follicular Unit Extraction: Advances and Challenges” — EADV, Berlin, 2023',
  '“Transection Rates in FUE Method: A Comparative Study” — ACSICON, Kerala, 2014',
  '“Utilization of Health Care Services in Public and Private Healthcare in India: Causes and Determinants”, 2019',
  '“Quality of Care in Cancer: An Exploration of Patient Perspectives”',
  'Book chapter: “Theories of Tobacco Addiction”, in Tobacco Cessation: A Practice Manual for Primary Care Physicians',
]

/** Native <details>, the kit's accordion replacement (reports/components.md). */
function Disclosure({ title, items }: { title: string; items: readonly string[] }) {
  // `group` is what makes `group-open:` on the +/- mark resolve.
  return (
    <details className={`group ${CARD}`}>
      {/* `marker:hidden` drops the default triangle; the +/- is the kit's own. */}
      <summary className="flex cursor-pointer items-center justify-between gap-4 font-head text-h5 text-secondary marker:content-[''] [&::-webkit-details-marker]:hidden">
        {title}
        <span
          aria-hidden="true"
          className="shrink-0 font-head text-h4 text-primary transition-transform duration-300 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <ul className="flex flex-col gap-3 border-t border-line pt-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Square className="mt-[7px] h-[10px] w-[10px] shrink-0 text-primary" />
            <span className="text-body">{item}</span>
          </li>
        ))}
      </ul>
    </details>
  )
}

export default function DoctorCredentials() {
  return (
    <section className="bg-surface py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-mobile md:gap-gap-tablet lg:gap-gap">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          {/* The 5px gap is Elementor's icon-list default. */}
          <p className="flex items-center gap-[5px] font-head text-h6 text-secondary">
            <Square className="h-[14px] w-[14px] shrink-0 text-primary" />
            Qualifications &amp; Research
          </p>

          <h2 className="text-balance font-head text-h2 lg:max-w-[660px]">
            Training, Memberships and Published Work
          </h2>
        </Reveal>

        {/* Qualifications and memberships -- short lists, always open. */}
        <div className="grid gap-gap-sm md:grid-cols-2 md:gap-8">
          <Reveal className={CARD}>
            <h3 className="font-head text-h5 text-secondary">Qualifications &amp; Awards</h3>
            <ul className="flex flex-col gap-3 border-t border-line pt-4">
              {DOCTOR.credentials.map((credential) => (
                <li key={credential.name} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-body">
                    <span className="text-secondary">{credential.name}</span>
                    {' — '}
                    {credential.issuer}
                  </span>
                </li>
              ))}
              {DOCTOR.awards.map((award) => (
                <li key={award} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-body">{award}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className={CARD}>
            <h3 className="font-head text-h5 text-secondary">Memberships</h3>
            <ul className="flex flex-col gap-3 border-t border-line pt-4">
              {DOCTOR.memberships.map((membership) => (
                <li key={membership.abbreviation} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-body">
                    {membership.name}{' '}
                    <span className="text-secondary">({membership.abbreviation})</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/*
          Faculty and research run to ten and seven entries. They are collapsed
          so the band stays scannable, but <details> keeps every line in the
          prerendered HTML, so nothing is hidden from a crawler.
        */}
        <div className="grid gap-gap-sm md:gap-8">
          <Reveal>
            <Disclosure title="Conference Faculty & Workshops" items={FACULTY} />
          </Reveal>
          <Reveal delay={100}>
            <Disclosure title="Published Research & Book Chapters" items={RESEARCH} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
