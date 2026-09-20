import Faq from '../Faq'
import { Section, SectionHead, type Ground } from '../treatment/shell'

/**
 * The FAQ band on an ad landing page.
 *
 * A thin wrapper, deliberately: the accordion itself is the site's one Faq
 * component (native <details>, no JS needed to read an answer -- see its
 * docblock), and the band around it is the shared Section/SectionHead shell.
 * All this adds is the `name` plumbing.
 *
 * `name` MUST DIFFER PER PAGE. Two accordions sharing a name behave as one
 * exclusive group, which is why PostProse uses "post-faq" rather than the home
 * band's name. No LP renders two accordions today, but the next one might.
 *
 * NO FAQPage SCHEMA. scripts/verify-seo.mjs asserts exactly 14 FAQPage graphs
 * and 82 questions across the site, all of them on already-built pages and all
 * read from src/seo/schema/. These landing pages are `noindex` and have no
 * such graph; emitting one here would fail that check.
 */
export default function LpFaq({
  name,
  heading,
  lede,
  items,
  ground = 'surface',
}: {
  name: string
  heading: string
  lede?: string
  items: { question: string; answer: string }[]
  ground?: Ground
}) {
  return (
    <Section ground={ground}>
      <SectionHead heading={heading} lede={lede} />
      <Faq
        name={name}
        items={items.map((item, i) => ({
          id: `${name}-${i}`,
          question: item.question,
          answer: <p className="text-body">{item.answer}</p>,
        }))}
      />
    </Section>
  )
}
