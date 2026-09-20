import StatBand from '../StatBand'

/**
 * The credibility band -- content doc SECTION 2, "The Numbers That Built Our
 * Reputation".
 *
 * The markup, the `primary` ground and all of the responsive reasoning now live
 * in StatBand, which was extracted from this file when the home page needed the
 * same band (CredibilityBar). Read StatBand's header for the design notes and
 * the departures from the Folixa reference; this file is only the content.
 *
 * Counter.tsx's header names this band as its intended second consumer: "the
 * content doc's Credibility Bar needs five more".
 *
 * The doc writes the fourth figure as "6 Million+". It is rendered 6,000,000+
 * to match the live site and STATS in config/site.ts, on the authority of the
 * doc's own SEO note on this section: "These numbers remain unchanged because
 * they're existing trust signals from the current website."
 */

/**
 * SECTION 2, verbatim. Labels are the doc's, not STATS' longer wording -- and
 * deliberately not CredibilityBar's either, which follows the home doc's
 * Credibility Bar table. The two pages state the same five figures in
 * different words and a different order because their source sections do.
 */
const FIGURES = [
  { to: 20, label: 'Years of Experience' },
  { to: 10000, label: 'Hair Transplants' },
  { to: 500, label: 'International Patients' },
  { to: 6000000, label: 'Hair Follicles Transplanted' },
  { to: 100000, label: 'PRP Sessions' },
]

export default function DoctorStats() {
  return <StatBand heading="The Numbers That Built Our Reputation" figures={FIGURES} />
}
