import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import RouteView from './routeView'
import { appRoutes, Layout, NotFound } from './routes'

/**
 * The Suspense boundary is only ever reached by a client-side navigation to a
 * blog post whose chunk has not been fetched yet -- see src/routeView.tsx. On
 * first load, prerendered or not, the matching module is preloaded before
 * render, so this renders straight through and the fallback never shows.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {appRoutes.map((r) => (
          <Route
            key={r.path}
            path={r.path}
            element={
              <Suspense fallback={<div className="min-h-[60vh]" />}>
                <RouteView route={r} />
              </Suspense>
            }
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
