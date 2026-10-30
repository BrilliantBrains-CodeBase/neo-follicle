/// <reference types="vite/client" />
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
// React Router v7 exports StaticRouter from the package root; the v6-era
// 'react-router-dom/server' subpath no longer exists.
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { preloadPath } from './routeView'

/**
 * Called once per route by scripts/prerender.mjs.
 *
 * Async because the split routes (the blog posts) must have their module in
 * memory before `renderToString` runs -- it cannot wait for a suspended
 * boundary, and rendering the fallback instead of the article would put an
 * empty page in the prerendered HTML. See src/routeView.tsx.
 */
export async function render(url: string): Promise<string> {
  await preloadPath(url)
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}

export { appRoutes } from './routes'
export { pages } from './seo/pages'
export { headerNav, footerColumns } from './config/nav'

/**
 * The visible FAQ of every treatment page, keyed by slug -- the SAME arrays
 * TreatmentPage renders, so scripts/prerender.mjs can emit FAQPage JSON-LD
 * that matches the page word for word (a Google requirement). Before this, 20
 * treatment pages showed an FAQ with no FAQPage markup at all.
 */
const treatmentModules = import.meta.glob<{ default?: { faq?: { items: { question: string; answer: string }[] } } }>(
  './content/treatments/*.ts',
  { eager: true },
)
export const treatmentFaqs: Record<string, { question: string; answer: string }[]> = Object.fromEntries(
  Object.entries(treatmentModules)
    .map(([file, mod]) => [file.replace(/^.*\/|\.ts$/g, ''), mod.default?.faq?.items ?? []] as const)
    .filter(([, items]) => items.length > 0),
)
