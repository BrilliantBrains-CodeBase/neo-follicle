import { Link } from 'react-router-dom'
import Counter from '../Counter'
import { Square, WhatsAppIcon } from '../icons'
import { CONTACT } from '../../config/site'

/**
 * About page hero -- the page's only <h1>.
 *
 * Layout is the content doc's own: "Luxury Hero (Full Width), Two-column
 * (60/40)", left copy and right "doctor portrait with floating stat cards".
 * The geometry is Hero.tsx's, which is folixa home section 2 (Elementor
 * container `1dd62f8`, card `4436131`) -- same 60/40 split, same rounded
 * full-bleed card, same button and eyebrow treatment.
 *
 * Copy is verbatim from content/About & Doctor Page/Neo Follicle Website
 * Content.md SECTION 1. Nothing here is authored.
 *
 * Elementor's breakpoints are max-width, Tailwind's are min-width. Per
 * tailwind.config.js the mapping is: Elementor desktop -> `lg:`, its tablet
 * band (768-1024) -> `md:`, its mobile (<=767) -> unprefixed.
 *
 * Three deliberate departures:
 *
 *   - The card ground is flat `secondary`, not a background photograph.
 *     Hero.tsx's /hero.webp is the home page's opener and the two pages would
 *     read as the same screen; the four About images that are safe to publish
 *     are all needed further down, and spending one here would mean showing it
 *     twice. The portrait carries the imagery instead, which is what the doc
 *     asks for. The kit is shadow-free, so depth is the ground step alone.
 *   - The floating stat cards are two of the five figures from SECTION 2, not
 *     new numbers. They repeat below in DoctorStats by design -- the doc puts
 *     them in both places.
 *   - The portrait is an <img fetchPriority="high">, not a CSS background: it
 *     is the LCP element on this page. Same call Hero.tsx made.
 *
 * `text-base` is ambiguous here (Tailwind font size vs the `base` colour
 * token), so white text uses `text-white` throughout -- same call as Hero.
 */

/** The kit's `float` hover: translateY(-8px) over .3s ease-out (DESIGN.md 5). */
const FLOAT = 'transition ease-out hover:-translate-y-2 motion-reduce:transform-none'

/** Both buttons share the kit's single geometry: radius 0.5rem, padding 1rem. */
const BUTTON = `inline-flex w-full items-center justify-center gap-2 rounded p-4 font-head text-button duration-500 md:w-auto ${FLOAT}`

/**
 * TRUST BADGES, verbatim from the content doc SECTION 1. Deliberately NOT
 * sourced from STATS in config/site.ts -- that wording differs ("Years of
 * Experience", "Hair Transplants Performed") and the doc states these figures
 * are the clinic's stated record. Same call Hero.tsx made for TRUST_STRIP.
 */
const TRUST_BADGES = ['20+ Years Experience', '10,000+ Hair Transplants', '500+ International Patients']

export default function DoctorHero() {
  // The card's inset is uniform on all three outer sides, where Hero.tsx sets
  // only the horizontal one. Hero.tsx is followed by a white section, so its
  // card floats clear without help; this one is followed by the saturated
  // `primary` stat band, and with no bottom inset that band's edge met the
  // card's rounded bottom corners dead-on -- an inset card butting into a
  // full-bleed slab. Matching the horizontal step (5/10) rather than adding a
  // section rhythm keeps it reading as the card's own margin.
  return (
    <section className="px-0 pb-0 md:px-5 md:pb-5 lg:px-10 lg:pb-10">
      <div className="relative isolate flex flex-wrap justify-between gap-gap-tablet overflow-hidden rounded-none bg-secondary px-gutter py-16 md:flex-nowrap md:rounded-lg lg:gap-gap lg:p-20">
        {/* Left column -- 60% desktop, 65% tablet, full width on mobile. */}
        <div className="flex w-full flex-col gap-4 md:w-[60%] lg:w-[58%]">
          {/* Eyebrow. The 15px is a hard override in the reference, not a token. */}
          <p className="flex items-start gap-2 font-head text-[15px] font-medium leading-[1.2em] tracking-[-0.02em] text-accent animate-fadeInUp motion-reduce:animate-none">
            <Square className="mt-[2px] h-[14px] w-[14px] shrink-0" />
            About Neo Follicle Hair Transplant Clinic
          </p>

          {/*
            No `capitalize`, though the reference's global h1 carries it. The
            doc's heading is not title case and the transform would render
            "10,000+ Hair Transplants In Bangalore". Same call Hero.tsx made.
          */}
          <h1 className="text-balance font-head text-h1 text-white animate-fadeInUp motion-reduce:animate-none">
            Meet the Expert Behind 10,000+ Hair Transplants in Bangalore
          </h1>

          <div className="mt-1 flex max-w-[620px] flex-col gap-4 animate-fadeInUp motion-reduce:animate-none">
            <p className="text-body text-white/90">
              Every successful hair restoration begins with the right diagnosis, the right
              technique, and the right surgeon. At Neo Follicle Hair Transplant Clinic, every
              treatment is personally guided by Dr. Sandeep Mahapatra, Senior Consultant
              Dermatologist, Cosmetic Expert, and Hair Transplant Surgeon with over two decades of
              experience in advanced hair restoration.
            </p>
            <p className="text-body text-white/90">
              Whether you&rsquo;re experiencing early hair thinning, a receding hairline, beard
              patchiness, or female pattern hair loss, our approach focuses on creating
              natural-looking, long-term results tailored to your hair loss journey.
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-gap-sm animate-fadeInUp motion-reduce:animate-none lg:mt-6">
            <Link
              to="/contact-us/"
              className={`${BUTTON} bg-primary text-white hover:bg-white hover:text-secondary`}
            >
              Book Your Consultation →
            </Link>
            {/* External host, so an <a> rather than a router Link. */}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`${BUTTON} border border-white/70 text-white/70 hover:border-white hover:text-white`}
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp Us
            </a>
          </div>

          <div className="mt-4 w-full animate-fadeInUp motion-reduce:animate-none">
            <div className="h-px w-full bg-white/20" />
            {/*
              Three badges, not Hero's four, so they wrap to at most two lines
              on the narrowest width and need none of Hero's marquee machinery.
              The separator trails its item rather than leading the next, so a
              wrap leaves the dot at the end of a line instead of orphaning it
              at the start of the following one -- same reasoning as Hero.
            */}
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-head text-h6 text-white">
              {TRUST_BADGES.map((item, i) => (
                <span key={item} className="flex items-center gap-x-3 whitespace-nowrap">
                  {item}
                  {i < TRUST_BADGES.length - 1 ? <span aria-hidden="true">·</span> : null}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/*
          Right column -- 40% desktop, 35% tablet. Unlike Hero's video card this
          is kept on mobile: it is the doctor's portrait on a page about him,
          and the doc names it as the hero's right half.
        */}
        <div className="relative w-full md:w-[35%] lg:w-[38%]">
          <div className="relative isolate h-full min-h-[360px] overflow-hidden rounded animate-fadeInUp motion-reduce:animate-none lg:min-h-[520px]">
            {/*
              /about-doctor.webp is a real photograph of Dr. Sandeep, client-
              supplied (Homepage/Doctor Images/Dr-Sandeep-Mahapatra-12.jpeg).
              Shared with About.tsx on the home page -- it is the only tall,
              high-resolution portrait in the delivered set, and this slot is
              portrait too. alt is descriptive, not empty: here the photograph
              is the subject of the section, not decoration.
            */}
            <img
              src="/about-doctor.webp"
              alt="Dr. Sandeep Mahapatra, Senior Consultant Dermatologist and Hair Transplant Surgeon, at Neo Follicle Hair Transplant Clinic in Bangalore."
              width={1095}
              height={1280}
              fetchPriority="high"
              className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
            />
            {/* The reference's ::before overlay, at its --overlay-opacity:0.75. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#02010100_35%,#1A1A1A_100%)] opacity-75"
            />
          </div>

          {/*
            The doc's "floating stat cards". They sit over the portrait's lower
            edge from `md` up and fall back to a normal row below it, where an
            absolutely positioned card would cover the face on a narrow screen.

            Side by side while they are in flow, stacked once they are floating.
            The right column is 35% of the container at `md`, so two cards
            abreast inside it are ~94px each and "10,000+" at the h4 clamp
            wants ~160. Stacked, each card gets the full inset width.
          */}
          <div className="mt-4 flex gap-gap-sm md:absolute md:inset-x-4 md:bottom-4 md:mt-0 md:flex-col md:gap-3">
            <div className="flex-1 rounded bg-base/95 p-4 backdrop-blur-[4px] animate-fadeInUp motion-reduce:animate-none">
              <Counter
                to={20}
                suffix="+"
                label="Years of Experience"
                reverse
                className="flex flex-col gap-gap-xs"
                numberClassName="font-head text-h4 text-secondary"
                labelClassName="text-[14px] leading-[1.3em] text-body"
              />
            </div>
            <div className="flex-1 rounded bg-primary p-4 animate-fadeInUp motion-reduce:animate-none">
              <Counter
                to={10000}
                suffix="+"
                label="Hair Transplants"
                reverse
                className="flex flex-col gap-gap-xs"
                numberClassName="font-head text-h4 text-white"
                labelClassName="text-[14px] leading-[1.3em] text-accent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
