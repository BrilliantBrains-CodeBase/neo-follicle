import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import StickyActionBar from './StickyActionBar'

export default function Layout() {
  return (
    <>
      {/*
        The wrapper only exists to reserve room for StickyActionBar, which is
        `fixed` and would otherwise cover the footer's legal bar. Padding has to
        sit below the footer, so it cannot go on <main>. Plain div, no overflow,
        so Header's `sticky top-0` and CommonQuestions' `lg:sticky` are unaffected.
      */}
      <div className="pb-[calc(72px+env(safe-area-inset-bottom))] lg:pb-0">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      <StickyActionBar />
    </>
  )
}
