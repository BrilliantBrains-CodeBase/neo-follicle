/**
 * Assembles a treatment page from its data module.
 *
 * Section grounds alternate `base`/`surface` from the section after the hero,
 * so the rhythm is a property of the page rather than something each of the ten
 * data modules has to get right. The hero is always `base`.
 *
 * The FAQ and the closing CTA are part of that same run, not exceptions to it:
 * the pages carry different numbers of sections, so pinning either one to a
 * fixed ground puts two `base` bands back to back on some pages and not on
 * others. Counting them as the last two positions keeps every page alternating
 * to the footer.
 */
import type { TreatmentPageData } from '../../content/treatments/types'
import Faq from '../Faq'
import Reveal from '../Reveal'
import TreatmentHero from './TreatmentHero'
import TreatmentSectionView from './sections'
import { CtaRow, SectionHead, Split, type Ground } from './shell'

/**
 * The closing CTA.
 *
 * Ported from DoctorCta, which is the reference's CTA band (container
 * `8af554c`) already translated once. Shares /footer-bg.webp with it and the
 * footer rather than spending a treatment image on a decorative backdrop.
 *
 * `text-base` and `text-body` are ambiguous here -- each is both a Tailwind
 * font-size and a colour token in tailwind.config.js -- so white copy on this
 * dark ground is written `text-white`, as all four dark doctor sections do.
 */
function TreatmentCta({ cta, ground }: { cta: TreatmentPageData['cta']; ground: Ground }) {
  return (
    <section
      className={`${ground === 'surface' ? 'bg-surface' : 'bg-base'} py-section-y-mobile md:py-section-y-tablet lg:py-section-y`}
    >
      <div className="container">
        <div className="relative isolate flex min-h-[450px] flex-col items-center justify-center gap-6 overflow-hidden rounded p-5 text-center md:min-h-[500px]">
          <img
            src="/footer-bg.webp"
            alt=""
            width={1920}
            height={1080}
            loading="lazy"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          />
          {/* The reference's overlay: `secondary` at --overlay-opacity:0.8. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-secondary opacity-80" />

          <h2 className="text-balance font-head text-h2 text-white animate-fadeInUp motion-reduce:animate-none lg:max-w-[760px]">
            {cta.heading}
          </h2>

          {cta.body && (
            <p className="text-body text-white/90 animate-fadeInUp motion-reduce:animate-none lg:max-w-[600px]">
              {cta.body}
            </p>
          )}

          <div className="mt-2 animate-fadeInUp motion-reduce:animate-none">
            <CtaRow ctas={cta.ctas} dark center />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function TreatmentPage({ data }: { data: TreatmentPageData }) {
  // The hero is `base`, so the first section below it is `surface`.
  const groundFor = (i: number): Ground => (i % 2 === 0 ? 'surface' : 'base')
  // The FAQ and CTA continue the run as the next two positions.
  const faqGround = groundFor(data.sections.length)
  const ctaGround = groundFor(data.sections.length + (data.faq ? 1 : 0))

  return (
    <>
      <TreatmentHero hero={data.hero} />

      {data.sections.map((section, i) => (
        <TreatmentSectionView key={`${section.kind}-${section.heading}`} section={section} ground={groundFor(i)} />
      ))}

      {data.faq && (
        /*
          Head left, accordion right. The accordion was an 860px box centred in
          the band; as the right column of a Split it fills the width it needs
          and the heading holds the left edge, which is the conventional FAQ
          layout and matches every other list section on the page.
        */
        <Split ground={faqGround} head={<SectionHead heading={data.faq.heading} align="left" />}>
          <Reveal className="w-full">
            {/*
              `name` groups the exclusive-open behaviour and must be unique per
              page; the slug guarantees that. Not `numbered` -- that is the home
              page's convention, and these questions carry no numeral in the copy.
            */}
            <Faq
              name={`faq-${data.slug}`}
              items={data.faq.items.map(({ question, answer }) => ({ question, answer }))}
            />
          </Reveal>
        </Split>
      )}

      <TreatmentCta cta={data.cta} ground={ctaGround} />
    </>
  )
}
