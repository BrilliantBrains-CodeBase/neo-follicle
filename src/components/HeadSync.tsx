import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pageByPath } from '../seo/pages'

/**
 * Keeps <title>, meta description and canonical in step on client-side
 * navigation.
 *
 * Every URL's <head> is prerendered (scripts/prerender.mjs), so crawlers and
 * first loads are already correct. But in-app <Link> navigation swaps only
 * the body: without this, the tab title, a bookmark, or a link shared from
 * the browser's share sheet all carry the FIRST page's title and canonical.
 */
export default function HeadSync() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = pageByPath[pathname]
    if (!page) return
    document.title = page.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description)
    // The noindex landing pages carry no canonical, so the tag comes and goes.
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!page.canonical) canonical?.remove()
    else {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = page.canonical
    }
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', page.og.url ?? '')
  }, [pathname])

  return null
}
