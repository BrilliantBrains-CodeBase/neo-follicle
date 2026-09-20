import type { Block } from '../content/types'
import PageBanner from './PageBanner'
import PostProse from './PostProse'
import Reveal from './Reveal'

/**
 * The shell both legal pages share -- privacy-policy and terms-of-use.
 *
 * NO NEW TYPOGRAPHY. The body is `Block[]` rendered by PostProse, which is the
 * same closed union the 19 blog posts use (src/content/types.ts) and the same
 * `.post-prose` cascade in src/index.css. A legal page is long-form prose with
 * headings, lists and the occasional table -- exactly what that cascade was
 * resolved for -- so giving these pages their own styles would have meant a
 * second, slightly-different set of rules for the same job.
 *
 * WHY A SINGLE COLUMN AND NOT A `Split`. The treatment pages hold the heading
 * in a sticky left column because their content is scannable blocks. A policy
 * is read top to bottom, and its numbered clauses are its own navigation; a
 * sticky heading beside thirteen sections would just be an empty third.
 *
 * MEASURE. `max-w-[75ch]` rather than the 68ch the treatment prose takes.
 * These bodies are denser and their lists run long; 68ch broke several clauses
 * onto a third line that read as separate points.
 *
 * The effective date is NOT a prop -- it is the first block of the captured
 * body ("Effective Date: 01-01-2025"), and it stays there so the date and the
 * text it governs cannot drift apart.
 */
export default function LegalPage({
  title,
  crumb,
  blocks,
}: {
  /** The page's only <h1>, from the PageSeo record. */
  title: string
  /** Breadcrumb leaf. Usually the same words as the title. */
  crumb: string
  blocks: Block[]
}) {
  return (
    <>
      <PageBanner
        crumbs={[{ label: 'Home', to: '/' }, { label: crumb }]}
        /*
          Shared with the home hero, the blog archive and contact-us -- the only
          clinic photograph in public/. A legal page does not warrant its own
          commissioned shot, so it takes the house banner.
        */
        image="/hero.webp"
        title={title}
      />

      <section className="bg-base py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
        <div className="container">
          <Reveal className="max-w-[75ch]">
            <PostProse blocks={blocks} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
