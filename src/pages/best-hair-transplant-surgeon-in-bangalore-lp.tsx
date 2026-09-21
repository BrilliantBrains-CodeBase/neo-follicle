import Celebrities from '../components/Celebrities'
import ContactCta from '../components/contact/ContactCta'
import ContactMap from '../components/contact/ContactMap'
import DoctorProfile from '../components/doctor/DoctorProfile'
import DoctorStats from '../components/doctor/DoctorStats'
import LpFaq from '../components/lp/LpFaq'
import PageBanner from '../components/PageBanner'
import TreatmentGallery from '../components/TreatmentGallery'
import TreatmentSectionView from '../components/treatment/sections'
import { LP_CELEBRITIES, LP_FAQ, LP_SERVICES } from '../content/lp/shared'
import { seoFor } from '../seo/pages'

/**
 * /best-hair-transplant-surgeon-in-bangalore-lp/ -- the surgeon ad landing page.
 *
 * NO GENERATED MARKER, DELIBERATELY -- see best-hair-transplant-clinic-lp.tsx,
 * which this page is the sibling of. Same noindex/no-canonical/not-in-nav
 * constraints, same assembled-not-designed approach, same shared content in
 * src/content/lp/shared.ts.
 *
 * THE ONLY REAL DIFFERENCE IS ORDER. The clinic LP leads with the clinic --
 * services, then results, then the doctor. This one leads with Dr. Mahapatra:
 * his profile and his numbers come first, because the ad that feeds it is
 * bought on "best hair transplant surgeon". The capture does exactly this, and
 * its celebrity heading names him rather than the clinic.
 *
 * NO FACILITIES GRID here -- the capture does not carry one. It has a
 * "Trusted by International & NRI Clients" band instead, which is covered by
 * the international copy on
 * /hair-transplant-medical-tourism-in-bangalore/; rather than duplicate that
 * page's content into an ad page, the services grid links to it.
 */
export default function BestHairTransplantSurgeonInBangaloreLp() {
  return (
    <>
      <PageBanner
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Hair Transplant Surgeon' }]}
        image="/hero.webp"
        title={
          seoFor('best-hair-transplant-surgeon-in-bangalore-lp').h1 ??
          'Top Hair Transplant Surgeon in Bangalore – Dr. Sandeep Mahapatra'
        }
      >
        {/* The capture's sub-headline, verbatim. */}
        <p className="text-body-lg text-white/90">
          10,000+ Successful Transplants | 20+ Years of Expertise
        </p>
      </PageBanner>

      <DoctorProfile />
      <DoctorStats />

      <TreatmentSectionView
        ground="surface"
        section={{
          kind: 'linkGrid',
          heading: 'Hair Transplant Services We Offer',
          items: LP_SERVICES,
        }}
      />

      <TreatmentGallery />

      <TreatmentSectionView
        ground="surface"
        section={{
          kind: 'personalities',
          heading: 'Sandalwood Celebrities Trust Dr Sandeep Mahapatra',
          people: LP_CELEBRITIES,
        }}
      />

      <Celebrities />

      <LpFaq
        name="surgeon-lp-faq"
        heading="FAQs on Hair Transplant in Bangalore"
        items={LP_FAQ}
        ground="surface"
      />

      <ContactMap />
      <ContactCta />
    </>
  )
}
