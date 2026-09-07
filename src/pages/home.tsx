import About from '../components/About'
import CommonQuestions from '../components/CommonQuestions'
import ContactUs from '../components/ContactUs'
import Hero from '../components/Hero'
import Insights from '../components/Insights'
import Process from '../components/Process'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import TreatmentGallery from '../components/TreatmentGallery'
import WhyNeoFollicle from '../components/WhyNeoFollicle'

/**
 * PagePlaceholder is deliberately NOT used here any more. It renders
 * seoFor(slug).h1, which would emit a second, conflicting <h1> under the
 * hero's -- the content doc's final recommendation 1 requires exactly one.
 *
 * Note that src/seo/pages.ts still carries the CAPTURED h1 for this page
 * ("Direct Hair Transplant Clinic in Bangalore for Natural-Looking Hair
 * Restoration"), which the page no longer renders. verify-seo.mjs does not
 * assert h1, so nothing breaks, but the field is stale -- reconcile it when
 * the rest of the home page lands.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyNeoFollicle />
      <Process />
      <Testimonials />
      <TreatmentGallery />
      <CommonQuestions />
      <ContactUs />
      <Insights />

      {/*
        Still to build from content/home-page/Neo-Follicle-Website-Content.md:
        International. The doc's Credibility Bar (between Hero and About) is
        also outstanding. International (SECTION 11) belongs between
        Testimonials and CommonQuestions when it lands.

        SECTION 13 Final CTA is covered by ContactUs -- it carries that
        section's heading and body. Do not add a second CTA band.
      */}
    </>
  )
}
