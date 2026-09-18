import { SITE } from '../config/site'
import { FacebookIcon, LinkedInIcon, PinterestIcon, XIcon } from './icons'

/**
 * The share row that closes a post.
 *
 * Design ported from the Folixa reference single post -- Elementor row
 * `9305e86` with the `jkit_social_share` widget `ffb5633`. Values from
 * folixa-design-reference/assets/css/uploads__sites__226__elementor__css__post-33.css:
 *
 *   row    rules ABOVE and BELOW at 1px #0000001A, 1rem padding either side
 *   label  h6 token at body colour
 *   chips  round, line #E5E7EB fill with secondary glyph, 8px padding,
 *          going primary with a white glyph on hover at 0.5s
 *
 * Plain share URLs, no SDKs: the reference loads none either, and a tracker per
 * network on every post would be a real cost for a link that could be a link.
 */

const CHIP =
  'grid h-9 w-9 place-items-center rounded-full bg-line text-secondary transition-colors duration-500 hover:bg-primary hover:text-base'

type ShareRowProps = {
  /** The post's route path. Made absolute here, since a share needs the origin. */
  path: string
  title: string
}

export default function ShareRow({ path, title }: ShareRowProps) {
  const url = `${SITE.origin}${path}`
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const targets = [
    { label: 'Facebook', Icon: FacebookIcon, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: 'X', Icon: XIcon, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { label: 'LinkedIn', Icon: LinkedInIcon, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: 'Pinterest', Icon: PinterestIcon, href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}` },
  ]

  return (
    <div className="mt-4 flex items-center justify-between gap-4 border-y border-[#0000001A] py-4">
      <p className="font-head text-h6 text-body">Share this article :</p>
      <ul className="flex items-center gap-2">
        {targets.map(({ label, Icon, href }) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noopener noreferrer" className={CHIP}>
              <Icon className="h-4 w-4" />
              <span className="sr-only">Share on {label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
