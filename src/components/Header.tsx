import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { headerCta, headerNav, headerPhone } from '../config/nav'
import { SITE } from '../seo/site'
import { ChevronDown, Close, MenuBars, Phone } from './icons'

/**
 * Site header, styled to the Folixa kit (see folixa-design-reference:
 * pages/home/rendered.html lines 293-338 and assets/css/...post-1741.css).
 *
 * Every dropdown panel and the whole mobile drawer are ALWAYS rendered and
 * hidden with CSS -- never conditionally mounted. scripts/verify-seo.mjs step 8
 * regexes <header>...</header> out of the prerendered home page and asserts
 * each internal href resolves to a real route, and the mega-menu is what
 * distributes link equity to ~54 of the 59 pages. Mounting a panel on state
 * would drop those links from the crawl surface.
 *
 * Two departures from the reference, both agreed deliberately:
 *   - the bar is sticky (the reference header scrolls away)
 *   - "Our Services" opens as a wide 3-column panel; the reference only ever
 *     had narrow 220px dropdowns, and this menu carries 20 links
 */

/** The kit has exactly one button style. Header CTA hover is accent, not primary-dark. */
const BUTTON =
  'inline-flex min-h-10 items-center justify-center rounded bg-primary px-6 py-4 font-head text-button text-base transition-colors duration-300 hover:bg-accent hover:text-secondary'

/**
 * Dropdown panel chrome: white, 8px radius, hairline border, no shadow (the
 * whole kit is shadow-free). The reference borders panels in `surface`
 * (#F8FAFC), which is invisible against a white page -- it only read on the
 * template's image-heavy hero. `line` (#E5E7EB) is the kit's own token for
 * exactly this job.
 */
const PANEL = 'rounded-[8px] border border-line bg-base'

/** Closed panels stay in the DOM; only opacity/visibility/offset change. */
const panelMotion = (open: boolean) =>
  open
    ? 'visible translate-y-0 opacity-100'
    : 'invisible -translate-y-[10px] opacity-0 pointer-events-none'

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerSubmenu, setDrawerSubmenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [canHover, setCanHover] = useState(true)
  const headerRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()

  /**
   * Hover-to-open is the reference behaviour, but on a touch screen the
   * synthesised mouseenter lands before the tap -- the menu would open and the
   * tap would immediately toggle it shut. Bind the hover handlers only where
   * hovering is real. Defaults to true so SSR emits the desktop markup.
   */
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setCanHover(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Hairline border appears only once the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Navigating must dismiss everything.
  useEffect(() => {
    setDrawerOpen(false)
    setDrawerSubmenu(null)
    setOpenMenu(null)
  }, [pathname])

  // The reference's .no-scroller.
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', drawerOpen)
    return () => document.body.classList.remove('overflow-hidden')
  }, [drawerOpen])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpenMenu(null)
      setDrawerOpen(false)
    }
    const onPointerDown = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b bg-base transition-colors duration-300 ${
        scrolled ? 'border-line' : 'border-transparent'
      }`}
    >
      {/* `relative` so the wide mega panel can span the container, not its trigger. */}
      <div className="container relative flex min-h-[91px] items-center justify-between gap-gap-sm py-gutter">
        <Link to="/" className="shrink-0">
          <img
            src={SITE.logo}
            alt={SITE.name}
            width={150}
            height={56}
            className="h-auto w-[150px]"
          />
        </Link>

        {/* Desktop nav. self-stretch so panels can hang off the bar's bottom edge. */}
        <nav aria-label="Primary" className="hidden self-stretch lg:block">
          <ul className="flex h-full items-stretch">
            {headerNav.map((item) => {
              if (item.kind === 'link') {
                return (
                  <li key={item.label} className="mx-4 flex items-center">
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `font-body text-body-lg transition-colors duration-300 hover:text-primary ${
                          isActive ? 'text-primary' : 'text-secondary'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              }

              const open = openMenu === item.label
              const wide = item.columns.length > 1

              return (
                <li
                  key={item.label}
                  className={`mx-4 flex items-center ${wide ? '' : 'relative'}`}
                  onMouseEnter={canHover ? () => setOpenMenu(item.label) : undefined}
                  onMouseLeave={
                    canHover
                      ? () => setOpenMenu((cur) => (cur === item.label ? null : cur))
                      : undefined
                  }
                  // Tabbing past an open menu should close it.
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setOpenMenu((cur) => (cur === item.label ? null : cur))
                    }
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenMenu((cur) => (cur === item.label ? null : item.label))
                    }
                    className={`inline-flex items-center font-body text-body-lg transition-colors duration-300 hover:text-primary ${
                      open ? 'text-primary' : 'text-secondary'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`ml-[6px] h-[14px] w-[14px] transition-transform duration-300 ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {wide ? (
                    // Spans the container. `top-full` lands on the header's
                    // bottom edge because the container is the offset parent.
                    <div
                      className={`absolute inset-x-0 top-full transition-all duration-[400ms] ease-out ${panelMotion(
                        open,
                      )}`}
                    >
                      <div
                        className={`${PANEL} grid grid-cols-3 gap-gap-sm rounded-t-none border-t-0 p-6`}
                      >
                        {item.columns.map((col, i) => (
                          <div key={col.title ?? i}>
                            {col.title && (
                              <span className="mb-2 block border-b border-line pb-3 font-head text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-primary">
                                {col.title}
                              </span>
                            )}
                            <ul>
                              {col.links.map((link, j) => (
                                <li key={`${link.to}-${j}`}>
                                  <Link
                                    to={link.to}
                                    className="block py-2 font-body text-body-lg text-secondary transition-colors duration-300 hover:text-primary"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Narrow 220px panel, anchored to its trigger. The pt
                    // bridges the bar's bottom padding so hover never breaks.
                    <div
                      className={`absolute left-0 top-full pt-gutter transition-all duration-[400ms] ease-out ${panelMotion(
                        open,
                      )}`}
                    >
                      <ul className={`${PANEL} min-w-[220px]`}>
                        {item.columns[0].links.map((link, j) => (
                          <li
                            key={`${link.to}-${j}`}
                            className="border-b border-surface last:border-0"
                          >
                            <Link
                              to={link.to}
                              className="block whitespace-nowrap px-6 py-3 font-body text-body-lg text-secondary transition-colors duration-300 hover:text-primary"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-gap-sm lg:flex">
          <a
            href={headerPhone.href}
            className="inline-flex items-center gap-gap-xs whitespace-nowrap font-head text-button text-secondary transition-colors duration-300 hover:text-primary"
          >
            <Phone className="h-5 w-5" />
            {headerPhone.label}
          </a>
          <Link to={headerCta.to} className={BUTTON}>
            {headerCta.label}
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          aria-controls="mobile-nav"
          onClick={() => setDrawerOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-primary text-base transition-colors duration-[400ms] hover:bg-accent hover:text-secondary lg:hidden"
        >
          <MenuBars className="h-6 w-6" />
        </button>
      </div>

      {/* Scrim. */}
      <div
        aria-hidden="true"
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-40 bg-[rgba(51,51,51,0.5)] transition-opacity duration-[600ms] lg:hidden ${
          drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Drawer. Always in the DOM -- translated off-screen when closed. */}
      <div
        id="mobile-nav"
        className={`fixed inset-y-0 left-0 z-50 flex w-full max-w-[90%] flex-col overflow-y-auto bg-base transition-transform duration-[600ms] ease-[cubic-bezier(.6,.1,.68,.53)] md:max-w-[350px] lg:hidden ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <Link to="/" className="shrink-0">
            <img
              src={SITE.logo}
              alt={SITE.name}
              width={130}
              height={49}
              className="h-auto w-[130px]"
            />
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-primary text-base transition-colors duration-[400ms] hover:bg-accent hover:text-secondary"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Mobile" className="pb-4">
          <ul>
            {headerNav.map((item) => {
              if (item.kind === 'link') {
                return (
                  <li key={item.label}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `block px-6 py-[10px] font-body text-body-lg transition-colors duration-300 hover:text-primary ${
                          isActive ? 'text-primary' : 'text-secondary'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              }

              const open = drawerSubmenu === item.label

              return (
                <li key={item.label}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() =>
                      setDrawerSubmenu((cur) => (cur === item.label ? null : item.label))
                    }
                    className={`flex w-full items-center px-6 py-[10px] text-left font-body text-body-lg transition-colors duration-300 ${
                      open ? 'text-primary' : 'text-secondary'
                    }`}
                  >
                    {item.label}
                    {/* The reference renders the mobile indicator as a bordered pill. */}
                    <span className="ml-auto flex h-[22px] shrink-0 items-center rounded-[30px] border border-line px-3">
                      <ChevronDown
                        className={`h-[10px] w-[10px] transition-transform duration-300 ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </button>

                  {/* 0fr -> 1fr keeps the links in the DOM while collapsed. */}
                  <div
                    className={`grid transition-all duration-300 ${
                      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      {item.columns.map((col, i) => (
                        <div key={col.title ?? i} className="pb-2">
                          {col.title && (
                            <span className="block px-6 pb-1 pt-3 font-head text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-primary">
                              {col.title}
                            </span>
                          )}
                          <ul>
                            {col.links.map((link, j) => (
                              <li key={`${link.to}-${j}`}>
                                <Link
                                  to={link.to}
                                  className="block py-[10px] pl-10 pr-6 font-body text-body-lg text-secondary transition-colors duration-300 hover:text-primary"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* The reference drawer has no CTA; on mobile it is the only conversion path. */}
        <div className="mt-auto border-t border-line p-6">
          <Link to={headerCta.to} className={`${BUTTON} w-full`}>
            {headerCta.label}
          </Link>
          <a
            href={headerPhone.href}
            className="mt-gap-sm inline-flex items-center gap-gap-xs font-head text-button text-secondary transition-colors duration-300 hover:text-primary"
          >
            <Phone className="h-5 w-5" />
            {headerPhone.label}
          </a>
        </div>
      </div>
    </header>
  )
}
