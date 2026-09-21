import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Reset client-side route navigations without overriding intentional anchors. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
