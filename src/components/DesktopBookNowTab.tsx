import { Link } from 'react-router-dom'
import { headerCta } from '../config/nav'

/** Persistent edge tab for the desktop consultation path. */
export default function DesktopBookNowTab() {
  return (
    <Link
      to={headerCta.to}
      aria-label="Book a hair consultation"
      className="fixed left-0 top-[42%] z-30 hidden -translate-y-1/2 rounded-r-lg bg-primary px-3 py-5 font-head text-[1rem] font-semibold tracking-wide text-base transition-[background-color,transform] duration-300 [writing-mode:vertical-rl] hover:translate-x-1 hover:bg-primary-dark hover:text-base focus-visible:translate-x-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent motion-reduce:transition-none lg:block"
    >
      Book Now
    </Link>
  )
}
