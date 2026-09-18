import { Link } from 'react-router-dom'
import Faq from './Faq'
import { groupFaq } from '../content/faq'
import type { Block, Inline, PostImage } from '../content/types'

/**
 * Renders a post's block tree.
 *
 * The bodies are the old WordPress site's published copy, which
 * neofollicle-seo-backup/reports/seo-audit.md marks P0-PRESERVE.
 * scripts/gen-posts.mjs parses each one into the closed `Block` / `Inline`
 * unions in src/content/types.ts, and this file is the other half of that
 * contract: a `switch` with no default, so adding a block type to the union
 * fails `npm run typecheck` until it is handled here.
 *
 * scripts/verify-posts.mjs proves the round trip -- every post's rendered text
 * still matches the captured HTML word for word.
 *
 * The FAQ section every post ends with is regrouped by `groupFaq` and rendered
 * as the site's shared accordion, so it matches the home page band instead of
 * reading as more article prose. That helper owns the segmentation rule and the
 * reasons the cheap versions of it are wrong.
 *
 * Typography is NOT set here. It lives in the `.post-prose` layer in
 * src/index.css, which carries the reference's resolved values from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-33.css
 * (notably: a body h2 takes the *h3* size token, deliberately smaller than a
 * section h2, and list items get hairline dividers). Keeping it in CSS means
 * the vertical rhythm is adjustable in one place and these components stay
 * structural. The repo has no @tailwindcss/typography and does not need it --
 * the plugin disagrees with the reference on nearly every load-bearing value.
 */

function Inlines({ nodes }: { nodes: Inline[] }) {
  return (
    <>
      {nodes.map((node, i) => {
        switch (node.t) {
          case 'text':
            return node.v
          case 'br':
            return <br key={i} />
          case 'strong':
            return (
              <strong key={i}>
                <Inlines nodes={node.c} />
              </strong>
            )
          case 'a': {
            const children = <Inlines nodes={node.c} />
            // Internal links go through the router so navigation stays a SPA
            // transition; everything else leaves the site.
            return node.href.startsWith('/') ? (
              <Link key={i} to={node.href} title={node.title}>
                {children}
              </Link>
            ) : (
              <a key={i} href={node.href} title={node.title} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            )
          }
        }
      })}
    </>
  )
}

function Figure({ image, className = '' }: { image: PostImage; className?: string }) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      className={className}
    />
  )
}

/**
 * A YouTube embed as a click-to-play poster.
 *
 * The reference drops a live <iframe> in. This does not: twelve of these across
 * the corpus would mean twelve third-party frames loading before the visitor
 * asks for one. The poster is the same still YouTube serves, and the frame is
 * only created on click -- so the prerendered HTML stays static and nothing
 * here depends on JS to be *readable*, only to play.
 */
function YouTube({ videoId, title }: { videoId: string; title: string }) {
  return (
    <a
      className="not-prose group relative block aspect-video overflow-hidden rounded"
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        width={480}
        height={360}
        loading="lazy"
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-0 grid place-items-center bg-secondary/30 transition-colors group-hover:bg-secondary/20">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-base transition-colors group-hover:bg-primary-dark">
          {/* A plain triangle -- icons.tsx `Play` is sized for the hero. */}
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-1 h-6 w-6">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </a>
  )
}

/** One block. Reachable from the top level and from inside a FAQ answer. */
function renderBlock(block: Block, i: number) {
  switch (block.t) {
    case 'p':
      return (
        <p key={i} className={block.small ? 'post-prose-small' : undefined}>
          <Inlines nodes={block.c} />
        </p>
      )

    case 'h': {
      const Tag = `h${block.level}` as 'h2' | 'h3' | 'h4'
      return (
        <Tag key={i} id={block.id}>
          <Inlines nodes={block.c} />
        </Tag>
      )
    }

    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <Tag key={i} className={block.small ? 'post-prose-small' : undefined}>
          {block.items.map((item, n) => (
            <li key={n}>
              <Inlines nodes={item} />
            </li>
          ))}
        </Tag>
      )
    }

    case 'hr':
      return <hr key={i} />

    case 'img':
      return block.avatar ? (
        // The author portrait. `alignleft size-thumbnail` in the source:
        // a small round crop the bio text sits beside.
        <Figure
          key={i}
          image={block.image}
          className="float-left mr-5 mb-2 h-[120px] w-[120px] rounded-full object-cover"
        />
      ) : (
        <Figure key={i} image={block.image} />
      )

    case 'gallery':
      return (
        <div key={i} className="post-prose-gallery">
          {block.images.map((image) => (
            <Figure key={image.src} image={image} />
          ))}
        </div>
      )

    case 'table':
      return (
        <div key={i} className="post-prose-table">
          <table>
            {block.head.length > 0 && (
              <thead>
                <tr>
                  {block.head.map((cell, n) => (
                    <th key={n} scope="col">
                      <Inlines nodes={cell} />
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows.map((row, n) => (
                <tr key={n}>
                  {row.map((cell, m) => (
                    <td key={m}>
                      <Inlines nodes={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'embed':
      return <YouTube key={i} videoId={block.videoId} title={block.title} />
  }
}

export default function PostProse({ blocks }: { blocks: Block[] }) {
  return (
    <div className="post-prose">
      {groupFaq(blocks).map((node, i) => {
        if (node.t !== 'faq') return renderBlock(node, i)
        return (
          <Faq
            key={i}
            // Not "home-faq": two accordions sharing a name would behave as a
            // single exclusive group if they ever met on one page.
            name="post-faq"
            items={node.items.map((item) => ({
              id: item.id,
              question: <Inlines nodes={item.question} />,
              answer: <div className="post-prose-faq">{item.answer.map(renderBlock)}</div>,
            }))}
          />
        )
      })}
    </div>
  )
}
