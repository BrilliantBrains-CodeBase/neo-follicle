import { Link } from 'react-router-dom'
import { BOOK } from '../content/treatments/ctas'
import Reveal from './Reveal'
import { ArrowRight, CheckCircle, Square } from './icons'
import { BUTTON, CtaButton, Section } from './treatment/shell'

/**
 * Homepage gateway for overseas visitors, sourced from the authored medical
 * tourism page and SECTION 11 of the homepage brief.
 *
 * This sits immediately after Celebrities: visitors move from social proof to
 * the dedicated international-patient route before entering the treatment
 * gallery and the rest of the homepage journey. Services keeps its earlier,
 * shorter international-patient signpost.
 *
 * FLAGGED FOR CLIENT REVIEW: the detailed page contains additional claims
 * about patient volume, travel logistics, cost, packages and stay duration.
 * They are deliberately omitted here until their currency and consistency are
 * confirmed. This teaser makes only the restrained claims already supported
 * across the page's consultation, travel-guidance and aftercare sections.
 *
 * CtaRow is not used because its light-ground secondary is an outline whose
 * line colour nearly disappears on this accent panel. The white secondary
 * button below is the stronger existing Celebrities-on-accent idiom.
 */

const ROUTE = '/hair-transplant-medical-tourism-in-bangalore/'

const POINTS = [
  'Virtual consultation before you travel',
  'Doctor-led planning with Dr. Sandeep Mahapatra',
  'Guidance on procedure scheduling, recovery time and return travel',
  'Follow-up guidance after you return home',
] as const

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary'

export default function InternationalPatients() {
  return (
    <Section ground="base">
      <div className="grid gap-gap-mobile rounded-lg border border-white/20 bg-accent p-[30px] md:gap-gap-tablet md:p-8 lg:grid-cols-2 lg:gap-x-gap lg:gap-y-8 lg:p-10">
        <Reveal className="flex flex-col gap-4 lg:col-start-1 lg:row-start-1">
          <p className="flex items-center gap-[5px] font-head text-h6 text-secondary">
            <Square className="h-[14px] w-[14px] shrink-0 text-primary" />
            Before You Travel
          </p>
          <h2 className="text-balance font-head text-h2 text-secondary">
            Hair Transplant for International Patients
          </h2>
          <p className="text-body-lg text-body">
            Planning a hair transplant abroad should feel organized - not overwhelming. Your consultation can
            start online, long before your flight.
          </p>
        </Reveal>

        <Reveal
          delay={100}
          className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-full lg:self-stretch"
        >
          <img
            src="/treatments/hair-transplant-medical-tourism-in-bangalore/video-consultation.webp"
            alt="A man at home on a video consultation, wearing a wireless earbud and looking at his laptop."
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] h-full w-full rounded object-cover md:aspect-[16/9] md:object-[50%_20%] lg:aspect-auto lg:min-h-[420px] lg:object-[40%_center]"
          />
        </Reveal>

        <Reveal delay={200} className="flex flex-col gap-6 lg:col-start-1 lg:row-start-2">
          <ul className="grid gap-3 md:grid-cols-2 md:gap-x-8 lg:grid-cols-1">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span className="text-body">{point}</span>
              </li>
            ))}
          </ul>

          <p className="text-body">
            Patients have travelled to Neo Follicle from the United States, the United Kingdom, Europe, Australia
            and the Gulf.
          </p>

          <div className="flex flex-col gap-gap-sm md:flex-row md:flex-wrap">
            <Link
              to={ROUTE}
              className={`${BUTTON} bg-primary text-white hover:bg-primary-dark ${FOCUS}`}
            >
              Plan Your Treatment Visit
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
            <CtaButton
              cta={BOOK}
              className={`${BUTTON} bg-base text-secondary hover:bg-secondary hover:text-white ${FOCUS}`}
            />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
