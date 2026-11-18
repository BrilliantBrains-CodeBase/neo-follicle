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
 * CtaRow is not used because its light-ground secondary is an outline whose
 * line colour nearly disappears on this accent panel. The white secondary
 * button below is the stronger existing Celebrities-on-accent idiom.
 */

const ROUTE = '/hair-transplant-medical-tourism-in-bangalore/'

const POINTS = [
  'Online Consultation Before You Travel',
  'Doctor-Led Hairline Design & Treatment Planning',
  'Assistance With Travel & Stay Arrangements',
  'Post-Transplant Care & Virtual Follow-Ups',
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
            International Patients
          </p>
          <h2 className="text-balance font-head text-h2 text-secondary">
            Your Hair Restoration Journey, Beyond Borders.
          </h2>
          <p className="text-body-lg text-body">
            Planning a Hair Transplant in Bangalore? We&rsquo;re Here to Guide You.
          </p>
          <p className="text-body">
            At Neo Follicle, we make hair restoration planning easier for international patients
            with expert consultations, personalised treatment plans and dedicated support
            throughout their journey, from the first virtual consultation to recovery back home.
          </p>
        </Reveal>

        <Reveal
          delay={100}
          className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-full lg:self-stretch"
        >
          <img
            src="/international-patients/section.webp"
            alt="International patient care at Neo Follicle Hair Transplant Clinic in Bangalore."
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] h-full w-full rounded object-cover object-center md:aspect-[16/9] lg:aspect-auto lg:min-h-[420px]"
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
            <span className="font-head text-h6 text-secondary">500+ International Patients</span>
            <span aria-hidden="true"> | </span>
            Dr. Sandeep Mahapatra
          </p>

          <div className="flex flex-col gap-gap-sm md:flex-row md:flex-wrap">
            <Link
              to={ROUTE}
              className={`${BUTTON} bg-primary text-white hover:bg-primary-dark ${FOCUS}`}
            >
              Explore International Patient Care
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
