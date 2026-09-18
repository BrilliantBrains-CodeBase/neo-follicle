import type { Block, Inline } from './types'

/**
 * Finds the FAQ section in a post body so it can be rendered as the site's
 * shared accordion (src/components/Faq.tsx) instead of flat prose.
 *
 * Every one of the 19 posts ends with a FAQ section -- 100 questions in total --
 * written as an h2, then an h3 per question, then that question's answer
 * paragraphs. As a flat block list it renders indistinguishably from the
 * article around it, while the same content on the home page is an accordion.
 * This groups it back up at render time.
 *
 * RENDER-TIME ONLY. The block trees in src/content/posts/ are generated from
 * the capture and are what scripts/verify-posts.mjs compares against it word
 * for word; nothing here edits them.
 *
 * THE SEGMENTATION RULE, AND WHY THE OBVIOUS SHORTCUTS ARE WRONG.
 * Take the first h2 whose text matches FAQ_HEADING, then every h3 strictly
 * after it and strictly before the next h2. Nothing cheaper survives the
 * corpus:
 *
 *   - "an h3 is a FAQ question" is false. 13 of the 19 posts have h3s outside
 *     their FAQ section, usually more than inside --
 *     hair-transplant-recovery-timeline has 10 in the FAQ and 43 outside.
 *   - "a numbered h3 is a FAQ question" is false. donor-area-planning-hair-
 *     transplant has 7 numbered non-FAQ h3s ("1. The Safe Donor Zone", ...)
 *     while its 8 actual FAQ questions carry no numbers at all.
 *   - "an h3 ending in ? is a FAQ question" is false. "Is Telogen Effluvium
 *     Permanent?", "Does PCOS Mean You Will Go Bald?" and "What Is Shock Loss?"
 *     are all mid-article headings.
 *
 * The rule was checked against all 19 posts and against the captured JSON-LD:
 * it reproduces the FAQPage `mainEntity` question set, in order, for all 14
 * posts that have one.
 */

/**
 * Matches every FAQ h2 in the corpus and nothing else.
 *
 * Deliberately not anchored to "FAQ": four posts head the section "Frequently
 * Asked Questions..." instead, and unethical-practices-in-hair-transplantation
 * uses the bare string "FAQs". A /^FAQ/ test silently misses three posts.
 */
const FAQ_HEADING = /faq|frequently asked/i

export type FaqQuestion = {
  /** The h3's anchor id, preserved so existing deep links still land. */
  id: string
  question: Inline[]
  answer: Block[]
}

export type FaqSection = { t: 'faq'; items: FaqQuestion[] }

/** What PostProse renders: an ordinary block, or one grouped FAQ section. */
export type ProseNode = Block | FaqSection

/** Plain text of an inline run, for matching heading text. */
export function inlineText(nodes: Inline[]): string {
  return nodes.map((n) => (n.t === 'text' ? n.v : n.t === 'br' ? ' ' : n.c ? inlineText(n.c) : '')).join('')
}

const isHeading = (block: Block, level: 2 | 3): block is Extract<Block, { t: 'h' }> =>
  block.t === 'h' && block.level === level

export function groupFaq(blocks: Block[]): ProseNode[] {
  const start = blocks.findIndex((b) => isHeading(b, 2) && FAQ_HEADING.test(inlineText(b.c)))
  if (start === -1) return blocks

  // The section runs to the next h2 -- "Blog Author & Medical Reviewer" on 14
  // posts, "Final Thoughts"/"Final Words" on the rest. No post's FAQ is last.
  let end = blocks.findIndex((b, i) => i > start && isHeading(b, 2))
  if (end === -1) end = blocks.length

  const items: FaqQuestion[] = []
  for (let i = start + 1; i < end; i++) {
    const block = blocks[i]
    if (!isHeading(block, 3)) continue

    const answer: Block[] = []
    for (let j = i + 1; j < end && !isHeading(blocks[j], 3); j++) {
      // Skip the rule that used to separate one answer from the next. Nine
      // posts end every answer with one and ten only the last; either way each
      // question is now a bordered card, so the rule would be a divider inside
      // a divider. Dropping it is render-only and adds no text, so the copy
      // gate is unaffected.
      if (blocks[j].t !== 'hr') answer.push(blocks[j])
    }
    items.push({ id: block.id, question: block.c, answer })
  }

  // No questions found under the heading: leave the body exactly as it was
  // rather than swallowing the section into an empty accordion.
  if (items.length === 0) return blocks

  // The h2 stays an ordinary heading -- its id is a table-of-contents anchor in
  // every post's generated `toc`.
  return [...blocks.slice(0, start + 1), { t: 'faq', items }, ...blocks.slice(end)]
}
