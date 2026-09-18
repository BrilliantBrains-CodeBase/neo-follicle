import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { preloadPath } from './routeView'
import './index.css'

const root = document.getElementById('root')!

const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// The split routes (the blog posts) are fetched before the first render, so
// hydration matches the prerendered article instead of momentarily replacing it
// with a Suspense fallback. scripts/prerender.mjs emits a modulepreload for the
// chunk, so this is already in flight by the time it is awaited.
// See src/routeView.tsx.
await preloadPath(window.location.pathname)

// Prerendered pages carry server markup; the dev server does not.
if (root.hasChildNodes()) {
  hydrateRoot(root, tree)
} else {
  createRoot(root).render(tree)
}
