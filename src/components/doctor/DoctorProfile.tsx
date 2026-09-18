import { CheckCircle, Square } from '../icons'

/**
 * Content doc SECTION 3, "About Dr. Sandeep Mahapatra".
 * Layout line in the doc: "Image Left | Content Right".
 *
 * Design ported from the Folixa reference, about page section 3 -- Elementor
 * container `e4912c8`, its `surface` image card `96e36da` and the outlined
 * chip row `2a60553` / `0d62364`. Values resolved from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-21.css;
 * the visual target is folixa-design-reference/pages/about/sections/03-*.png.
 * Two equal columns at the reference's 619px each inside the 1240 container,
 * gap 4rem, stacking below `lg`.
 *
 * Copy is verbatim from the content doc. Nothing here is authored.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Three deliberate departures from the reference:
 *
 *   - The columns are mirrored: image left, content right, per the doc's own
 *     layout line. The reference runs text left, card right.
 *   - The reference's chip row holds four one-word labels ("Expert Team",
 *     "Certified Clinic"). The doc's credential lines run much longer, so the
 *     chips wrap to a column below `md` rather than staying a wrapping row --
 *     six full-width pills read better than six ragged part-lines.
 *   - The section heading is an <h2>. The doc marks it `###`, but under this
 *     page's single <h1> the next level is <h2>; DoctorHero owns the h1.
 */

/**
 * SECTION 3 "His treatment philosophy combines", verbatim.
 */
const PHILOSOPHY = [
  'Dermatology-led diagnosis',
  'Advanced hair restoration science',
  'Natural hairline aesthetics',
  'Long-term planning',
  'Donor area preservation',
]

/**
 * SECTION 3 "Credentials", verbatim.
 *
 * Deliberately NOT assembled from DOCTOR.credentials / .memberships in
 * config/site.ts -- that data is transcribed from the indexed JSON-LD and is a
 * different list (degrees and issuing institutions, plus five societies). Both
 * are true and both are shown: this is the doc's short-form billing, and the
 * config-sourced long form is rendered further down in DoctorCredentials.
 * Same call About.tsx made on the home page.
 */
const CREDENTIALS = [
  'MBBS',
  'MD (Dermatology)',
  'Senior Consultant Dermatologist',
  'Cosmetic Expert',
  'Hair Transplant Surgeon',
  'Founder, Neo Follicle Hair Transplant Clinic',
]

export default function DoctorProfile() {
  return (
    <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container flex flex-col gap-gap-mobile md:flex-row md:gap-gap-tablet lg:gap-gap">
        {/* Left -- the reference's `surface` card, image inset by its padding. */}
        <div className="flex rounded bg-surface p-4 animate-fadeInUp motion-reduce:animate-none md:w-1/2 md:p-6 lg:p-8">
          {/*
            FLAGGED FOR CLIENT REVIEW. Client-supplied via the content doc
            (content/About & Doctor Page/images/image5.jpg), but it is generic
            stock: the clinician shown is not Dr. Sandeep and the room is not
            Neo Follicle. On-topic and free of burned-in text or third-party
            branding, which is why it survived the cull -- see the note in
            DoctorPhilosophy for the four images that did not. Real photographs
            of Dr. Sandeep exist at neofollicle-seo-backup/media/files/
            wp-content/uploads/2025/05/Dr-Sandeep-Mahapatra-*.jpg if the client
            prefers authentic imagery here.

            alt describes what is depicted and names no one, because the people
            in it are models.
          */}
          <img
            src="/about/profile.webp"
            alt="A dermatologist examining a seated patient's hairline across a consultation desk."
            width={900}
            height={507}
            loading="lazy"
            className="h-full min-h-[280px] w-full rounded object-cover lg:min-h-[420px]"
          />
        </div>

        {/* Right -- heading, copy, philosophy list, credential chips. */}
        <div className="flex flex-col gap-6 animate-fadeInUp motion-reduce:animate-none md:w-1/2">
          <p className="flex items-start gap-2 font-head text-h6 text-secondary">
            <Square className="mt-[5px] h-[14px] w-[14px] shrink-0 text-primary" />
            About Dr. Sandeep Mahapatra
          </p>

          {/*
            No `capitalize`, though the reference's global h2 carries it -- the
            transform would render "Cosmetic Expert & Hair Transplant Surgeon"
            unchanged but "Senior Consultant Dermatologist" is already correct,
            and the ampersand clause must not shift. Same call Hero.tsx made.
          */}
          <h2 className="text-balance font-head text-h3 text-secondary">
            Senior Consultant Dermatologist, Cosmetic Expert &amp; Hair Transplant Surgeon
          </h2>

          <div className="flex flex-col gap-4">
            <p className="text-body">
              Dr. Sandeep Mahapatra founded Neo Follicle with a simple belief: hair restoration
              should never be one-size-fits-all.
            </p>
            <p className="text-body">
              Every patient has a different hair loss pattern, donor strength, future hair loss
              risk, and aesthetic goal. That&rsquo;s why every treatment begins with a detailed
              consultation before recommending a hair transplant, PRP, GFC, Exosome Therapy,
              QR678, or other medical hair restoration solutions.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-head text-h6 text-secondary">His treatment philosophy combines:</p>
            <ul className="flex flex-col gap-2">
              {PHILOSOPHY.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The reference's outlined pill chips (border 1px `secondary`,
              radius 100px = the `pill` token, padding 0.5rem 1rem). */}
          <div className="flex flex-col gap-3 border-t border-line pt-6">
            <p className="font-head text-h6 text-secondary">Credentials</p>
            <ul className="flex flex-col gap-2 md:flex-row md:flex-wrap">
              {CREDENTIALS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-pill border border-secondary px-4 py-2"
                >
                  <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-[14px] leading-[1.3em] text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
