import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from '../icons'

/**
 * The jump-nav above a gallery's sections.
 *
 * NATIVE <details>, NOT REACT STATE -- the same call Faq.tsx makes, for the
 * same reason. The site is prerendered and nothing may depend on JS to be
 * readable (see Reveal.tsx), and these are eight internal links to eight
 * anchored sections, which is a real crawlable link block. A <select> or a
 * JS-toggled menu would ship an empty control to a visitor with no JS and hide
 * those links from anything reading the static HTML. <details> collapses them
 * visually while leaving every one in the markup, and it opens with no script
 * at all. It also supplies aria-expanded itself, so do not hand-roll it.
 *
 * This replaced a row of chips. Eight of them wrapped to two lines at every
 * desktop width, which was visually noisy, pushed the sticky bar to 113px, and
 * got worse with each section added -- it did not scale. A disclosure is a
 * fixed 69px whatever the section count, which is also what lets
 * SECTION_SCROLL_MARGIN below be a single number.
 *
 * PLAIN ANCHORS INSIDE. A react-router <Link> to a hash would push a route; a
 * bare <a href="#id"> is the browser's own same-document jump, which costs no
 * JavaScript and works on a cold load of /image-gallery/#female-hair-restoration.
 * react-router-dom v7 does not intercept bare anchors.
 *
 * The bar sits at `z-20`: below StickyActionBar (z-30) and the header (z-50),
 * so it slides UNDER the header rather than over it.
 */

/**
 * Put this on every section the nav points at.
 *
 * An anchored heading has to clear BOTH sticky bars, not just the header:
 * 97px of header (the figure sticky.ts derives from Header.tsx) plus this bar's
 * 75px, measured against the built pages, plus 1rem of breathing room.
 *
 * ONE NUMBER, at every width, on both galleries, for any number of sections --
 * because a disclosure is a fixed height where the old chip row was 69px as a
 * single line and 113px once eight chips wrapped, which needed a per-breakpoint
 * pair that would have gone stale the first time someone edited a label.
 */
export const SECTION_SCROLL_MARGIN = 'scroll-mt-[188px]'

type NavSection = { id: string; label: string }

const SUMMARY =
  'flex w-full cursor-pointer list-none items-center justify-between gap-4 rounded border border-line ' +
  'bg-surface px-4 py-3 font-head text-button text-secondary transition hover:border-primary ' +
  'hover:text-primary [&::-webkit-details-marker]:hidden'

export default function GalleryNav({
  sections,
  label,
  /**
   * Shown before any section is current -- at the top of the page, and as the
   * static server-rendered state. Phrase it to read after "Jump to:".
   */
  placeholder,
}: {
  sections: NavSection[]
  label: string
  placeholder: string
}) {
  /*
   * Which section is on screen. Enhancement only: the server renders `null`,
   * which shows `placeholder` -- a correct static state, not a broken one. The
   * guard matches Reveal.tsx's own.
   */
  const [active, setActive] = useState<string | null>(null)
  const ref = useRef<HTMLDetailsElement | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // "Current" is whatever crosses the upper-middle band, so a section
        // counts while you are reading it rather than the instant it appears.
        const hit = entries.find((e) => e.isIntersecting)
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const el of targets) observer.observe(el)
    return () => observer.disconnect()
  }, [sections])

  /*
   * Close on Escape and on a click elsewhere. Both are enhancements on top of
   * the native control: without JS the panel still opens and still closes via
   * the summary, it simply stays open until it is clicked again.
   */
  useEffect(() => {
    const close = () => {
      if (ref.current) ref.current.open = false
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || !ref.current?.open) return
      close()
      // Put focus back where it can be seen, rather than leaving it on a
      // panel that has just been hidden.
      ref.current.querySelector('summary')?.focus()
    }
    const onPointer = (e: MouseEvent) => {
      if (!ref.current?.open) return
      if (!ref.current.contains(e.target as Node)) close()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onPointer)
    }
  }, [])

  const current = sections.find((s) => s.id === active)

  return (
    <nav
      aria-label={label}
      className="sticky top-[97px] z-20 border-b border-line bg-base/95 py-3 backdrop-blur"
    >
      <div className="container">
        <details ref={ref} className="group relative w-full md:max-w-[380px]">
          <summary className={SUMMARY}>
            {/*
              The label names what it does; the current section is the value.
              Announcing only the section name would leave a screen reader user
              guessing what activating it will do.
            */}
            <span className="truncate">
              <span className="text-body">Jump to: </span>
              {current?.label ?? placeholder}
            </span>
            <ChevronDown className="h-3 w-3 shrink-0 transition-transform duration-300 group-open:rotate-180" />
          </summary>

          {/*
            Absolutely positioned so opening the panel does not shove the page
            down -- this bar is sticky, and a bar that changed height on open
            would move the content under it. max-h + scroll keeps a long list
            reachable on a short screen.
          */}
          <ul className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-10 max-h-[60vh] overflow-y-auto rounded border border-line bg-base p-2 shadow-lg">
            {sections.map((section) => {
              const on = section.id === active
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={on ? 'true' : undefined}
                    // Native <details> does not close when a link inside it is
                    // followed, and a same-document jump does not reload, so
                    // the panel would sit open over the section just jumped to.
                    onClick={() => {
                      if (ref.current) ref.current.open = false
                    }}
                    className={`block rounded px-3 py-2 font-head text-button transition-colors ${
                      on ? 'bg-primary text-white' : 'text-secondary hover:bg-surface hover:text-primary'
                    }`}
                  >
                    {section.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </details>
      </div>
    </nav>
  )
}
