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

function start() {
  // Prerendered pages carry server markup; the dev server does not.
  if (root.hasChildNodes()) {
    hydrateRoot(root, tree)
  } else {
    createRoot(root).render(tree)
  }
}

// The split routes (the blog posts and the two galleries) are fetched before
// the first render, so hydration matches the prerendered article instead of
// momentarily replacing it with a Suspense fallback. scripts/prerender.mjs
// emits a modulepreload for the chunk, so this is already in flight by the
// time it is awaited. See src/routeView.tsx.
//
// THIS MUST NOT BE A TOP-LEVEL AWAIT, and that is not a style preference --
// `await preloadPath(...)` here deadlocked every split route, which is to say
// it shipped all 19 blog posts with no JavaScript running at all: dead mobile
// menu, dead FAQ accordions, dead everything, on the pages carrying 58,000
// words of the site's content.
//
// The cycle: top-level await suspends THIS module mid-evaluation, and this
// module is the entry chunk. The route chunk it then dynamically imports
// depends on the entry chunk for every shared module it uses -- React, the
// router, Layout, PageBanner. Those bindings are not available until the entry
// chunk finishes evaluating, which cannot happen until the await resolves,
// which is waiting on that very import. Nothing errors; the promise simply
// never settles, so hydrateRoot is never reached.
//
// Calling start() from .then() lets this module finish evaluating immediately,
// which is what lets the route chunk resolve. If the preload fails, hydrate
// anyway rather than leaving a dead page -- RouteView throws to the Suspense
// boundary in App.tsx, which is the case that boundary exists for.
preloadPath(window.location.pathname).then(start, start)
