import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, Close } from './icons'
import type { GalleryImage } from '../content/gallery/types'

/**
 * Full-screen viewer for a gallery image.
 *
 * PROGRESSIVE, NOT REQUIRED. Every tile in the grid is already an anchor to its
 * own full-size WebP, so with JavaScript off the gallery is a working page of
 * linked photographs -- the rule Reveal.tsx states. This only intercepts the
 * click. It renders nothing at all until one happens, so it costs the
 * prerendered HTML zero bytes (scripts/prerender.mjs would otherwise have to
 * serialise a hidden dialog on both gallery pages).
 *
 * It is mounted by the page, not by the grid, because arrowing has to walk a
 * section's images and the grid only knows its own tile.
 *
 * Why this is hand-rolled: the repo has three runtime dependencies and no
 * Radix, headlessui or focus-trap. The focusable set inside this dialog is
 * fixed and tiny -- close, previous, next, "open original" -- so the trap is an
 * ordered array of four refs rather than a querySelectorAll sweep that would
 * need re-running on every render.
 *
 * Z-INDEX. The ladder StickyActionBar.tsx documents is header and drawer z-50,
 * drawer scrim z-40, action bar z-30. This is the new top rung at z-[60]: a
 * viewer that slid under the sticky header would be a bug.
 */

type Props = {
  images: GalleryImage[]
  index: number
  /** Shown in the counter, e.g. "Beard Transplant Results — 3 of 15". */
  sectionHeading: string
  onClose: () => void
  onIndex: (next: number) => void
}

export default function Lightbox({ images, index, sectionHeading, onClose, onIndex }: Props) {
  const image = images[index]
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)
  const openRef = useRef<HTMLAnchorElement | null>(null)
  const touchX = useRef<number | null>(null)
  const touchY = useRef<number | null>(null)

  const go = useCallback(
    (delta: number) => onIndex((index + delta + images.length) % images.length),
    [index, images.length, onIndex],
  )

  /* ---- focus in, and focus back out ---------------------------------------
     The opener is whatever had focus when the page opened this, which is the
     tile's anchor. Returning focus there on unmount is what keeps keyboard
     navigation from restarting at the top of the document. */
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    return () => opener?.focus?.()
  }, [])

  /* ---- scroll lock ---------------------------------------------------------
     Hiding the body's overflow removes the scrollbar, and on a desktop browser
     that reflows the whole page a few pixels wider the moment the viewer opens.
     Padding the difference back on keeps it still. Zero on overlay-scrollbar
     platforms, so this is a no-op there. */
  useEffect(() => {
    const { body, documentElement } = document
    const gap = window.innerWidth - documentElement.clientWidth
    const overflow = body.style.overflow
    const padding = body.style.paddingRight
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`
    return () => {
      body.style.overflow = overflow
      body.style.paddingRight = padding
    }
  }, [])

  /* ---- preload the neighbours ---------------------------------------------
     Five lines, and it is the difference between arrowing feeling instant and
     feeling like a page load. The browser caches these against the same URLs
     the <img> will request. */
  useEffect(() => {
    for (const d of [-1, 1]) {
      const neighbour = images[(index + d + images.length) % images.length]
      if (neighbour && neighbour !== image) new Image().src = neighbour.full.src
    }
  }, [index, images, image])

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        onClose()
        return
      case 'ArrowLeft':
        e.preventDefault()
        go(-1)
        return
      case 'ArrowRight':
        e.preventDefault()
        go(1)
        return
      case 'Home':
        e.preventDefault()
        onIndex(0)
        return
      case 'End':
        e.preventDefault()
        onIndex(images.length - 1)
        return
      case 'Tab': {
        // The trap. Four controls, in DOM order.
        const order: HTMLElement[] = []
        for (const ref of [closeRef, prevRef, nextRef, openRef]) {
          if (ref.current) order.push(ref.current)
        }
        if (order.length === 0) return
        const at = order.indexOf(document.activeElement as HTMLElement)
        const next = e.shiftKey ? at - 1 : at + 1
        const wrapped = (next + order.length) % order.length
        // Only take over when focus is inside the set and would leave it; an
        // unexpected focus target falls through to the browser.
        if (at === -1) {
          e.preventDefault()
          order[0]?.focus()
          return
        }
        e.preventDefault()
        order[wrapped]?.focus()
        return
      }
      default:
    }
  }

  if (typeof document === 'undefined' || !image) return null

  const captionId = 'lightbox-caption'
  const single = images.length < 2

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-secondary/95 p-gutter backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={captionId}
        /*
          `w-auto`, not `w-full`: the dialog shrinks to the image. Several
          sources are only 512-650px wide and the pipeline never upscales them,
          so a full-width dialog would strand the arrows against the viewport
          edges with a lot of dead space between them and the photo.
        */
        className="relative flex max-h-full w-auto max-w-full flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null
          touchY.current = e.touches[0]?.clientY ?? null
        }}
        onTouchEnd={(e) => {
          const startX = touchX.current
          const startY = touchY.current
          touchX.current = null
          touchY.current = null
          if (startX === null || startY === null || single) return
          const dx = (e.changedTouches[0]?.clientX ?? startX) - startX
          const dy = (e.changedTouches[0]?.clientY ?? startY) - startY
          // Ignore anything closer to vertical -- that is a scroll attempt.
          if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return
          go(dx < 0 ? 1 : -1)
        }}
      >
        <div className="flex w-full items-center justify-end">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="grid h-11 w-11 place-items-center rounded-pill bg-base/10 text-base transition-colors hover:bg-base/20"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>

        <div className="flex min-h-0 w-full items-center justify-center gap-2 md:w-auto md:gap-4">
          <button
            ref={prevRef}
            type="button"
            onClick={() => go(-1)}
            disabled={single}
            aria-label="Previous image"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-pill bg-base/10 text-base transition-colors hover:bg-base/20 disabled:opacity-30"
          >
            <ArrowRight className="h-5 w-5 rotate-180" />
          </button>

          {/*
            object-contain and a dvh cap: never crop, not even here -- these are
            before/after composites and half the comparison would go. `dvh`
            rather than `vh` so a collapsing mobile toolbar cannot make the
            image taller than the screen, the same call sticky.ts makes.
          */}
          <img
            key={image.full.src}
            src={image.full.src}
            alt={image.alt}
            width={image.full.width}
            height={image.full.height}
            decoding="async"
            className="mx-auto max-h-[75dvh] w-auto max-w-full rounded object-contain"
          />

          <button
            ref={nextRef}
            type="button"
            onClick={() => go(1)}
            disabled={single}
            aria-label="Next image"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-pill bg-base/10 text-base transition-colors hover:bg-base/20 disabled:opacity-30"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex w-full flex-col items-center gap-2 text-center">
          <p id={captionId} className="text-body-lg text-base">
            <span className="font-head">{sectionHeading}</span>
            <span className="text-line"> — {index + 1} of {images.length}</span>
          </p>
          {/* The caveat has to be visible here: at full size a burned-in
              caption dominates the frame and alt text reaches nobody who can
              see it. Only the failed-repair set carries one. */}
          {image.caption && <p className="max-w-[68ch] text-line">{image.caption}</p>}
          <a
            ref={openRef}
            href={image.full.src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4 transition-colors hover:text-base"
          >
            Open original
          </a>
        </div>
      </div>
    </div>,
    document.body,
  )
}
