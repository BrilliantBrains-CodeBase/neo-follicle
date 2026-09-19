import { useState } from 'react'

/**
 * A YouTube video as a click-to-play facade.
 *
 * The reference drops a live <iframe> in and the old video gallery embedded 49
 * of them. This does not: forty-five third-party frames loading before anyone
 * asks for one is forty-five connections to Google, a large main-thread cost,
 * and a visitor's IP sent to YouTube for a page they may only scroll past.
 * Nothing here contacts YouTube until a click.
 *
 * What the server renders, and what a visitor with JavaScript off gets, is the
 * same in both modes: an anchor to the watch page wrapping the poster and a
 * play glyph. That is the invariant Reveal.tsx states -- nothing may depend on
 * JS to be readable, only to play. `mode="inline"` then upgrades the click to
 * an in-place swap so the visitor never leaves the page.
 *
 * Replaces the private `YouTube` that used to live in PostProse.tsx; that file
 * now calls this with mode="link", its original behaviour.
 */

export type FacadePoster = { src: string; width: number; height: number }

type Props = {
  videoId: string
  /**
   * The video's real title. This is the anchor's accessible name, the poster's
   * alt text and the iframe's title, so it is never empty or a bare id --
   * verify-gallery.mjs check 12 enforces that for the gallery.
   */
  title: string
  poster: FacadePoster
  /**
   * 'link'   -- navigate to youtube.com in a new tab (the blog's behaviour).
   * 'inline' -- replace this tile with a player, in place.
   */
  mode?: 'link' | 'inline'
  className?: string
  /** Poster loading strategy. The first row of a grid may want 'eager'. */
  loading?: 'lazy' | 'eager'
}

/**
 * The embed parameters, and where they differ from the ones the captured
 * lite-youtube elements used (`playsinline=0&rel=0&enablejsapi=1`):
 *
 *   - youtube-nocookie.com, because no frame exists until an explicit click, so
 *     there is genuinely no third-party contact to consent to beforehand.
 *   - autoplay=1 is required, not a preference: the click IS the play gesture,
 *     and without it the visitor has to click a second time. The gesture
 *     carries through to the new frame, and `allow` lists autoplay.
 *   - rel=0 is kept from the capture -- related videos stay on this channel.
 *   - playsinline=1 INVERTS the capture's 0. On iOS, 0 forces a fullscreen
 *     takeover, which throws the visitor out of the page -- the opposite of
 *     what an in-place player is for.
 *   - enablejsapi=1 is dropped. Nothing here drives the player through the JS
 *     API, and it brings an `origin` requirement that breaks on preview hosts.
 */
const PARAMS = 'autoplay=1&rel=0&playsinline=1&modestbranding=1'

const ALLOW =
  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'

export default function YouTubeFacade({
  videoId,
  title,
  poster,
  mode = 'link',
  className = '',
  loading = 'lazy',
}: Props) {
  const [playing, setPlaying] = useState(false)

  const frame = `not-prose group relative block aspect-video overflow-hidden rounded ${className}`

  if (playing) {
    return (
      <div className={frame}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${PARAMS}`}
          title={title}
          loading="lazy"
          allow={ALLOW}
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    )
  }

  return (
    <a
      className={frame}
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        if (mode !== 'inline') return
        // Let the browser handle every click that means "somewhere else":
        // cmd/ctrl-click, shift, alt, and middle or right button. Swallowing
        // those would break opening a video in a new tab, which is a thing
        // people do with a grid of forty-five of them.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        setPlaying(true)
      }}
    >
      <img
        src={poster.src}
        alt={title}
        width={poster.width}
        height={poster.height}
        loading={loading}
        decoding="async"
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
