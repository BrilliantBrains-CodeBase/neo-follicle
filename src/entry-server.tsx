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
