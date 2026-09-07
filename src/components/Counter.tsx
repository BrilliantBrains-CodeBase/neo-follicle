import { useEffect, useRef, useState } from 'react'

/**
 * The kit's `counter` widget, rebuilt.
 *
 * folixa-design-reference/reports/components.md counts 8 uses site-wide and
 * specifies the rebuild: replace jquery-numerator with an IntersectionObserver
 * plus requestAnimationFrame count-up over 2000ms, which is the widget's
 * `data-duration` on every instance.
 *
 * Two of those 8 are the about section's stat cards; the content doc's
 * Credibility Bar needs five more. Hence a component rather than something
 * local to About.tsx.
 *
 * SSR AND SEO. The first render MUST emit the final number, not zero.
 * scripts/prerender.mjs renders this component to static HTML, and those
 * figures are the clinic's stated record -- a prerendered "0" would be both a
 * factual error in the served markup and a lost keyword. So `display` starts at
 * `to` and only drops to the start value once we are on the client, animating,
 * and the element is about to enter the viewport. Do not "fix" this by
 * initialising state to 0.
 */

/** data-duration on every counter instance in the capture. */
const DURATION_MS = 2000

/** Matches the delimiter Elementor formats with (data-delimiter=","). */
const format = (n: number) => n.toLocaleString('en-US')

type CounterProps = {
  /** The value to count to. Rendered as-is on the server and before animation. */
  to: number
  /** Trails the number in the same type, e.g. "+" or "%". */
  suffix?: string
  /**
   * The counter-title. Rendered AFTER the number in the DOM; the reference's
   * photo card flips the two visually with flex-direction: column-reverse, so
   * callers that want the label above pass `reverse`.
   */
  label?: string
  reverse?: boolean
  className?: string
  numberClassName?: string
  labelClassName?: string
}

export default function Counter({
  to,
  suffix = '',
  label,
  reverse = false,
  className = '',
  numberClassName = '',
  labelClassName = '',
}: CounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(to)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect the kit's reduced-motion rule (reports/animations.md): every
    // entrance animation is replaced by its end state, not a shorter one.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        // Count each counter once. Disconnecting here also stops a re-entry
        // from restarting the animation mid-flight.
        observer.disconnect()

        const start = performance.now()
        const step = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1)
          setDisplay(Math.round(to * progress))
          if (progress < 1) frame = requestAnimationFrame(step)
        }
        frame = requestAnimationFrame(step)
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [to])

  const number = (
    <div key="number" className={numberClassName}>
      {/*
        Number and suffix are concatenated into ONE expression on purpose.
        Rendering them as adjacent JSX children makes React emit a `<!-- -->`
        separator between the two text nodes in the prerendered HTML, which
        splits "10,000+ Transplants" in the served markup.
      */}
      {`${format(display)}${suffix}`}
    </div>
  )

  const title = label ? (
    <p key="label" className={labelClassName}>
      {label}
    </p>
  ) : null

  return (
    <div ref={ref} className={className}>
      {reverse ? [number, title] : [title, number]}
    </div>
  )
}
