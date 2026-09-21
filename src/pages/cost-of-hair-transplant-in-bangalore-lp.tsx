import Celebrities from '../components/Celebrities'
import ContactCta from '../components/contact/ContactCta'
import ContactMap from '../components/contact/ContactMap'
import DoctorStats from '../components/doctor/DoctorStats'
import LpFaq from '../components/lp/LpFaq'
import PageBanner from '../components/PageBanner'
import TreatmentGallery from '../components/TreatmentGallery'
import TreatmentSectionView from '../components/treatment/sections'
import WhyNeoFollicle from '../components/WhyNeoFollicle'
import { seoFor } from '../seo/pages'

/**
 * /cost-of-hair-transplant-in-bangalore-lp/ -- the cost ad landing page.
 *
 * NO GENERATED MARKER, DELIBERATELY -- see best-hair-transplant-clinic-lp.tsx.
 * Same noindex/no-canonical/not-in-nav constraints.
 *
 * THE LONGEST OF THE FOUR at 2,930 captured words, and the only one needing
 * markup the site did not already have: two THREE-column pricing tables. That
 * is what the `table` section kind added to ./types.ts is for -- `timeline`
 * was the near miss but is deliberately two columns.
 *
 * ITS FAQ IS ITS OWN. The clinic and surgeon LPs share ten general questions
 * (src/content/lp/shared.ts); these eight are about price and appear nowhere
 * else, so they live here rather than in the shared module.
 *
 * IT IS NOT THE COST PAGE. /hair-transplant-cost-in-bangalore/ is the indexed,
 * sitemapped treatment page on the same subject and is already built. This is
 * the ad destination: same numbers, fewer words, one ask. The two are
 * cross-linked below rather than left as silent duplicates -- the LP is
 * `noindex`, so there is no cannibalisation risk in linking them.
 */
export default function CostOfHairTransplantInBangaloreLp() {
  return (
    <>
      <PageBanner
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Hair Transplant Cost' }]}
        image="/hero.webp"
        title={
          seoFor('cost-of-hair-transplant-in-bangalore-lp').h1 ?? 'Hair Transplant Cost in Bangalore'
        }
      >
        {/* The capture's sub-headline, verbatim. */}
        <p className="text-body-lg text-white/90">
          Get a clear, personalized estimate based on your graft requirement, baldness grade and
          donor area.
        </p>
      </PageBanner>

      <TreatmentSectionView
        ground="surface"
        section={{
          kind: 'featureGrid',
          heading: 'Why Hair Transplant Cost Is Different for Every Patient',
          lede: 'Hair transplant pricing is not the same for everyone because every person has a different pattern of hair loss.',
          items: [
            {
              title: '1. Number of Grafts Required',
              body: 'The single biggest factor. More grafts means more extraction, more implantation time and a higher total.',
            },
            {
              title: '2. Grade of Baldness',
              body: 'The stage of baldness decides how much area needs coverage and how many follicles that will take.',
            },
            {
              title: '3. Donor Area Quality',
              body: 'Donor density and hair calibre decide how much can safely be harvested in one session.',
            },
            {
              title: '4. Hairline Design',
              body: 'A natural hairline needs finer single-follicle grafts placed at the right angle and direction.',
            },
            {
              title: '5. Technique Used',
              body: 'FUE, DHT and implanter-pen techniques differ in time, precision and the team required.',
            },
            {
              title: '6. Density Expectations',
              body: 'Higher density over the same area needs more grafts, which changes the estimate.',
            },
          ],
        }}
      />

      <TreatmentSectionView
        ground="base"
        section={{
          kind: 'table',
          heading: 'Estimated Hair Transplant Cost by Number of Grafts',
          intro:
            'Most hair transplant estimates are based on the number of grafts required to cover your thinning or bald area.',
          /* The capture's first column header is empty. Kept as captured. */
          columns: ['Session', 'Grafts', 'Price'],
          rows: [
            ['ALPHA Session', '1000 - 1500 Grafts (2000 - 3000 Follicles)', 'Rs.60 to Rs.100 per Graft*'],
            ['BETA Session', '1500 - 2000 Grafts (3000 - 4000 Follicles)', 'Rs.60 to Rs.100 per Graft*'],
            ['GAMMA Session', '2500 - 3500 Grafts (5000 - 7000 Follicles)', 'Rs.60 to Rs.100 per Graft*'],
            ['MEGA Session', '3500 - 4500 Grafts (7000 - 9000 Follicles)', 'Rs.60 to Rs.100 per Graft*'],
            ['GIGA Session', '> 4500 Grafts (> 9000 Follicles)', 'Rs.60 to Rs.100 per Graft*'],
          ],
          note: '*Final cost is confirmed only after a scalp assessment. The per-graft range depends on technique, donor quality and the density planned.',
        }}
      />

      <TreatmentSectionView
        ground="surface"
        section={{
          kind: 'table',
          heading: 'Hair Transplant Cost Based on Baldness Grade',
          lede: 'The stage of baldness is one of the biggest factors that decides how many grafts and follicles you will need.',
          columns: ['Baldness Pattern', 'Appx. Graft Requirement', 'Suitable Session Type'],
          rows: [
            ['Mild hairline recession', '1000–1500 grafts', 'ALPHA Session'],
            ['Frontal hairline + temple recession', '1500–2000 grafts', 'BETA Session'],
            ['Frontal baldness with mid-scalp thinning', '2500–3500 grafts', 'GAMMA Session'],
            ['Crown baldness or larger thinning area', '2500–4500 grafts', 'GAMMA / MEGA Session'],
            ['Advanced baldness with large coverage need', '3500–4500+ grafts', 'MEGA / GIGA Session'],
          ],
        }}
      />

      <TreatmentGallery />

      <TreatmentSectionView
        ground="surface"
        section={{
          kind: 'checklist',
          heading: 'What Is Included in the Hair Transplant Cost?',
          points: [
            'Consultation and scalp assessment',
            'Graft extraction and implantation',
            'Surgeon and surgical team fees',
            'Procedure-day medication and dressings',
            'Post-operative care instructions and recovery kit',
            'Follow-up reviews after the procedure',
          ],
          secondary: {
            heading: 'What Is Excluded',
            points: [
              'Pre-operative blood investigations, where advised',
              'Long-term medical therapy such as minoxidil or finasteride',
              'Additional regenerative sessions (PRP, GFC) taken separately',
              'Travel and accommodation',
            ],
          },
        }}
      />

      <TreatmentSectionView
        ground="base"
        section={{
          kind: 'process',
          heading: 'How Neo Follicle Estimates Your Hair Transplant Cost',
          lede: 'Our cost estimation process.',
          steps: [
            { title: 'Scalp Assessment', body: 'Your pattern, stage and scalp condition are examined.' },
            { title: 'Donor Area Evaluation', body: 'Donor density and calibre decide what can safely be harvested.' },
            { title: 'Graft Requirement Calculation', body: 'The area to cover is translated into a graft count.' },
            { title: 'Hairline & Density Planning', body: 'The hairline is designed to your face, age and long-term pattern.' },
            { title: 'Session Type Recommendation', body: 'The graft count maps to an ALPHA, BETA, GAMMA, MEGA or GIGA session.' },
            { title: 'Cost Explanation', body: 'The estimate is explained line by line, with what is and is not included.' },
            { title: 'Treatment Plan Finalization', body: 'The plan and date are confirmed once you are comfortable with it.' },
          ],
        }}
      />

      <DoctorStats />
      <Celebrities />

      <LpFaq
        name="cost-lp-faq"
        heading="FAQs - Hair Transplant Cost in Bangalore"
        items={[
          {
            question: 'How is the cost of a hair transplant calculated?',
            answer:
              'The cost is usually calculated based on the number of grafts you need and the technique used (FUE, FUT, or NFT). After a scalp evaluation, we can provide a personalized estimate.',
          },
          {
            question: 'How many grafts do I need, and how does that impact the price?',
            answer:
              'The number of grafts depends on the extent of your hair loss and desired coverage. For example, a receding hairline may need 1200–1800 grafts, while full crown restoration may require 2500+. More grafts = higher cost.',
          },
          {
            question: 'Is there a fixed package, or is every case priced differently?',
            answer:
              'At Neo Follicle, we offer both. You can choose between personalized per-graft pricing or bundled packages that include PRP sessions, follow-ups, and medication.',
          },
          {
            question: 'Are there any hidden charges apart from the quoted cost?',
            answer:
              'No. Our pricing is fully transparent. We include consultation, graft extraction, implantation, surgeon fees, post-op care, and your recovery kit in the final estimate.',
          },
          {
            question: 'Do you offer EMI or financing options for the procedure?',
            answer:
              'Yes! We provide easy EMI plans with 0% interest through trusted finance partners. You can spread the cost over several months based on eligibility.',
          },
          {
            question: 'Why do prices vary so much between clinics in Bangalore?',
            answer:
              'Prices depend on surgeon experience, technique, graft quality, safety protocols, and long-term results. Cheaper doesn’t always mean better - invest in results that last.',
          },
          {
            question: 'How does Neo Follicle’s pricing compare to other clinics?',
            answer:
              'While we may not be the cheapest, we focus on delivering long-term value. Our price reflects skilled surgical execution, advanced scarless techniques (like NFT), proper hygiene, and high patient satisfaction.',
          },
          {
            question: 'What’s the ROI of getting a hair transplant?',
            answer:
              'A successful hair transplant is a one-time investment with lifelong results. It boosts your confidence, appearance, and sometimes even your career - making it well worth the cost for many of our patients.',
          },
        ]}
        ground="surface"
      />

      <WhyNeoFollicle />
      <ContactMap />
      <ContactCta />
    </>
  )
}
