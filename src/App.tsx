import { Route, Routes } from 'react-router-dom'
import { appRoutes, Layout, NotFound } from './routes'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {appRoutes.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
