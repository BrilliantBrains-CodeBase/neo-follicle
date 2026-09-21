import About from '../components/About'
import Celebrities from '../components/Celebrities'
import CommonQuestions from '../components/CommonQuestions'
import ContactUs from '../components/ContactUs'
import CredibilityBar from '../components/CredibilityBar'
import Hero from '../components/Hero'
import Insights from '../components/Insights'
import Process from '../components/Process'
import Services from '../components/Services'
import TreatmentGallery from '../components/TreatmentGallery'
import Videos from '../components/Videos'
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
      <CredibilityBar />
      <About />
      <Services />
      <TreatmentGallery />
      <Process />
      <Celebrities />
      <WhyNeoFollicle />
      <Videos />
      <CommonQuestions />
      <ContactUs />
      <Insights />

      {/*
        Still to build from content/home-page/Neo-Follicle-Website-Content.md:
        International (SECTION 11), which belongs between Celebrities and
        CommonQuestions when it lands.

        SECTION 10's testimonial half is NOT on the page. Celebrities renders
        only that section's celebrity claim; the three patient quotes are kept
        verbatim in a TODO at the top of that component and still need a home.

        The doc's Credibility Bar is no longer outstanding -- it is the
        CredibilityBar above, between Hero and About as the doc places it.

        SECTION 13 Final CTA is covered by ContactUs -- it carries that
        section's heading and body. Do not add a second CTA band.
      */}
    </>
  )
}
