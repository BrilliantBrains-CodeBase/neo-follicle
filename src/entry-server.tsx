import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
// React Router v7 exports StaticRouter from the package root; the v6-era
// 'react-router-dom/server' subpath no longer exists.
import { StaticRouter } from 'react-router-dom'
import App from './App'

/** Called once per route by scripts/prerender.mjs. */
export function render(url: string): string {
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
