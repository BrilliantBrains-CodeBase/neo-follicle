import { appRoutes } from './routes'
import type { AppRoute } from './routes'
import type { ComponentType, ReactElement } from 'react'

/**
 * Per-route code splitting for the pages whose module is too big to ship
 * everywhere.
 *
 * Why this exists: the 19 blog posts carry 58,000 words of body content as
 * generated block trees (src/content/posts/, ~1.4 MB of source). src/routes.tsx
 * imports every page statically, so Rollup hoists the lot into the single entry
 * chunk -- meaning the *home page* would download all 19 articles. Measured, it
 * took the entry chunk from ~90 KB to 289 KB gzipped. Splitting only the post
 * routes puts each article in its own chunk, fetched when that article is
 * actually opened.
 *
 * Why not React.lazy: `lazy` always suspends the first time React renders it,
 * even when the underlying module is already in memory, because React only
 * subscribes to the factory's promise at that first render. `renderToString`
 * cannot wait for a suspended boundary, so prerendering would emit the fallback
 * instead of the article -- and the article is the entire point of the page.
 *
 * So the cache below is read synchronously. `preload` is awaited before the
 * first render on both sides (scripts/prerender.mjs via entry-server, and
 * src/main.tsx before hydrate), which means the module is always warm by then
 * and `RouteView` returns the component without suspending. The thrown promise
 * is the fallback path, and it only happens on a client-side navigation to a
 * post that has not been opened yet -- exactly the case a Suspense boundary is
 * for.
 */

type Entry = ComponentType | Promise<void>

const cache = new Map<string, Entry>()

/** Fetch a route's module, if it has one. Safe to call repeatedly. */
export function preload(route: AppRoute): Promise<void> | undefined {
  if (!route.load) return
  const entry = cache.get(route.slug)
  if (typeof entry === 'function') return
  if (entry) return entry

  const pending = route.load().then((mod) => {
    cache.set(route.slug, mod.default)
  })
  cache.set(route.slug, pending)
  return pending
}

/**
 * Warm every split route matching a pathname. Called once before the first
 * render on each side, so that render never suspends.
 */
export async function preloadPath(pathname: string): Promise<void> {
  await Promise.all(appRoutes.filter((route) => route.path === pathname).map((route) => preload(route)))
}

export default function RouteView({ route }: { route: AppRoute }): ReactElement {
  if (route.element) return route.element

  const entry = cache.get(route.slug)
  if (typeof entry === 'function') {
    const Page = entry
    return <Page />
  }

  // Not warm: hand the boundary above a promise to wait on, the same contract
  // React.lazy uses internally.
  throw preload(route) ?? new Promise<void>(() => {})
}
