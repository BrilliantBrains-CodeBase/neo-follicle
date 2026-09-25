import { Link } from 'react-router-dom'
import Faq from './Faq'
import { groupFaq } from '../content/faq'
import type { Block, Inline, PostImage } from '../content/types'
import YouTubeFacade from './YouTubeFacade'

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
 * The body of this now lives in YouTubeFacade, which /video-gallery/ shares.
 * Blog posts keep mode="link", so a click opens youtube.com in a new tab.
 *
 * THE POSTER IS LOCAL, and used to not be. It pointed at YouTube's remote
 * `hqdefault.jpg`, which is the 480x360 4:3 tier: `aspect-video` with
 * object-cover then crops it back to 16:9, leaving 480x270 of real picture
 * upscaled about 1.7x in an ~830px prose column. Against /video-gallery/,
 * whose posters are cut from the 1280x720 maxres tier, it looked like the
 * wrong thumbnail -- and for one video it WAS wrong: that crop assumes
 * hqdefault is letterboxed and takes 45px off each edge to drop the bars, but
 * G9tFWishCwU's hqdefault has none, so it lost 12.5% of the picture.
 *
 * The old note here said a local poster would mean pulling the gallery's
 * manifest into every code-split post chunk. It does not: the path is a pure
 * function of the id, so this costs nothing but the string. The shape is
 * gallery-assets.mjs's `videoPosterPath`, inlined because a .tsx cannot import
 * a Node script module -- verify-gallery.mjs check 14 asserts the two agree.
 *
 * scripts/gen-video-gallery.mjs scans these posts, so every embedded id has a
 * poster on disk whether or not it also appears in /video-gallery/. Six of the
 * ten already did.
 */
function YouTube({ videoId, title }: { videoId: string; title: string }) {
  return (
    <YouTubeFacade
      videoId={videoId}
      title={title}
      poster={{ src: `/video-gallery/${videoId}.webp`, width: 640, height: 360 }}
    />
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
