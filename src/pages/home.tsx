import About from '../components/About'
import Hero from '../components/Hero'
import Services from '../components/Services'

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

      {/*
        Sections 5-15 of content/home-page/Neo-Follicle-Website-Content.md are
        still to build: Why Choose, Patient Journey, Results, Social Proof,
        International, FAQ, Final CTA, Guides. The doc's Credibility Bar
        (between Hero and About) is also outstanding.
      */}
    </>
  )
}
