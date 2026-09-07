import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

/**
 * Scroll-triggered `fadeInUp`, the replacement for Elementor's own observer.
 *
 * Folixa's entire motion system is one entrance animation applied 272 times
 * (folixa-design-reference/reports/animations.md). Elementor ships each element
 * with `elementor-invisible` (opacity 0) and adds the animation class when it
 * scrolls into view. We cannot copy that: the site is prerendered
 * (`vite build --ssr` -> scripts/prerender.mjs) and scripts/verify-seo.mjs
 * reads the static HTML, so nothing may depend on JS to become visible.
 *
 * So the default state here is *visible with no animation*, which is what the
 * server renders and what a no-JS or reduced-motion visitor keeps. Only after
 * mount, and only for elements that are genuinely below the fold, do we hide
 * and then reveal. An element already on screen at mount is left alone --
 * animating it would just flash content the visitor is already reading.
 *
 * The keyframe itself is in tailwind.config.js at Elementor's exact values:
 * 1.25s, `both`, travelling translate3d(0, 100%, 0). The travel is 100% of the
 * element's own height, not a fixed offset -- swapping in a flat 40px changes
 * the feel of every section.
 */

type RevealProps = {
  /** Element to render. Cards live in an <ol>, so `li` is needed. */
  as?: 'div' | 'li' | 'section'
  /** Stagger, in ms. Matches Elementor's `_animation_delay`. */
  delay?: number
  className?: string
  children: ReactNode
}

type Phase = 'static' | 'hidden' | 'running'

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [phase, setPhase] = useState<Phase>('static')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return

    setPhase('hidden')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setPhase('running')
        observer.disconnect()
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const phaseClass =
    phase === 'hidden' ? 'opacity-0' : phase === 'running' ? 'animate-fadeInUp motion-reduce:animate-none' : ''

  const style: CSSProperties | undefined =
    phase === 'running' && delay ? { animationDelay: `${delay}ms` } : undefined

  return (
    <Tag ref={ref as never} className={`${className} ${phaseClass}`.trim()} style={style}>
      {children}
    </Tag>
  )
}
