import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { captureAttribution } from './attribution'
import Header from './Header'
import Footer from './Footer'
import DesktopBookNowTab from './DesktopBookNowTab'
import DesktopWhatsAppButton from './DesktopWhatsAppButton'
import ScrollToTop from './ScrollToTop'
import StickyActionBar from './StickyActionBar'

export default function Layout() {
  // Landing-page URL only; in-app navigation never carries ad params.
  useEffect(captureAttribution, [])

  return (
    <>
      <ScrollToTop />
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
      <DesktopBookNowTab />
      <DesktopWhatsAppButton />
      <StickyActionBar />
    </>
  )
}
