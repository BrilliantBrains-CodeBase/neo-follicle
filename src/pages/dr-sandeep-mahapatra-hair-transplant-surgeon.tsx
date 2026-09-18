import DoctorApproach from '../components/doctor/DoctorApproach'
import DoctorCredentials from '../components/doctor/DoctorCredentials'
import DoctorCta from '../components/doctor/DoctorCta'
import DoctorDifference from '../components/doctor/DoctorDifference'
import DoctorExpertise from '../components/doctor/DoctorExpertise'
import DoctorHero from '../components/doctor/DoctorHero'
import DoctorPhilosophy from '../components/doctor/DoctorPhilosophy'
import DoctorProfile from '../components/doctor/DoctorProfile'
import DoctorReach from '../components/doctor/DoctorReach'
import DoctorStats from '../components/doctor/DoctorStats'

/**
 * The About page.
 *
 * It lives at /dr-sandeep-mahapatra-hair-transplant-surgeon/ rather than at an
 * /about-us/ of its own because that is where the site's About already is: the
 * header's "About" link points here (src/config/nav.ts), 54 of the 59 captured
 * pages link here, it is in the sitemap, and its own JSON-LD has declared
 * ["MedicalWebPage","ProfilePage","AboutPage"] since the WordPress site. The
 * old site has no /about/ or /about-us/ URL at all, so there is no equity to
 * inherit and nothing to redirect -- only this URL to avoid breaking.
 *
 * THE HEAD IS FROZEN; THE BODY IS OURS. scripts/verify-seo.mjs asserts this
 * page's <title>, meta description, canonical, robots and entire JSON-LD graph
 * byte-for-byte against neofollicle-seo-backup. Nothing in src/seo/pages.ts or
 * src/seo/schema/ may be touched from here without failing `npm run verify`.
 * Two known defects are therefore left in place for a separate ticket that
 * updates the baseline with the client: the meta description is Slim SEO
 * body-dump junk ("Home » Dr Sandeep Mahapatra Hair Transplant Surgeon ..."),
 * and the schema graph gives two nodes the same @id (`...#webpage`).
 *
 * Sections are content/About & Doctor Page/Neo Follicle Website Content.md in
 * its own order, one component per SECTION, with one addition:
 * DoctorCredentials has no counterpart in the doc and carries the
 * qualifications, memberships, faculty and research from the page this one
 * replaces. See its header for why.
 *
 * PagePlaceholder is deliberately NOT used here any more. It renders
 * seoFor(slug).h1, which would emit a second, conflicting <h1> under
 * DoctorHero's -- the content doc's final recommendation 1 requires exactly
 * one. Same reason home.tsx dropped it.
 *
 * Do not run `npm run gen:pages`. scripts/gen-pages.mjs rewrites every file in
 * src/pages/ as a PagePlaceholder stub and would destroy this page and
 * home.tsx along with it.
 */
export default function DrSandeepMahapatraHairTransplantSurgeon() {
  return (
    <>
      <DoctorHero />
      <DoctorStats />
      <DoctorProfile />
      <DoctorPhilosophy />
      <DoctorExpertise />
      <DoctorApproach />
      <DoctorReach />
      <DoctorDifference />
      <DoctorCredentials />
      <DoctorCta />
    </>
  )
}
