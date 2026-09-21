import { CONTACT, SOCIAL } from '../config/site'
import { WhatsAppIcon, FollowIcon, SOCIAL_COLORS, socialIcons } from './icons'

/**
 * Separate desktop WhatsApp and social-follow actions.
 *
 * Mobile already has WhatsApp in StickyActionBar, so this control starts at
 * the same `lg` breakpoint where that bar disappears. Keeping it in the
 * shared Layout makes the action available on every route without duplicating
 * page-specific markup. Only the Follow button reveals the social tower;
 * focus-within mirrors hover so keyboard users can reach every link as well.
 */
export default function DesktopWhatsAppButton() {
  return (
    <nav
      aria-label="Social media shortcuts"
      className="fixed bottom-8 right-8 z-30 hidden flex-col-reverse items-center gap-3 lg:flex"
    >
      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Neo Follicle on WhatsApp"
        title="Chat with us on WhatsApp"
        className="grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-base ring-4 ring-base transition-[background-color,transform] duration-300 hover:scale-105 hover:bg-[#128C7E] hover:text-base focus-visible:outline-none focus-visible:ring-[#25D366] focus-visible:ring-offset-4 motion-reduce:transform-none"
      >
        <WhatsAppIcon className="h-8 w-8" />
      </a>

      <div className="group/follow flex flex-col-reverse items-center">
        <button
          type="button"
          aria-label="Follow Neo Follicle on social media"
          title="Follow us"
          className="grid h-14 w-14 place-items-center rounded-full bg-primary text-base ring-4 ring-base transition-[background-color,transform] duration-300 hover:scale-105 hover:bg-primary-dark hover:text-base focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-4 motion-reduce:transform-none"
        >
          <FollowIcon className="h-6 w-6" />
        </button>

        <div className="invisible grid translate-y-3 grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,transform,visibility] duration-300 group-hover/follow:visible group-hover/follow:translate-y-0 group-hover/follow:grid-rows-[1fr] group-hover/follow:opacity-100 group-focus-within/follow:visible group-focus-within/follow:translate-y-0 group-focus-within/follow:grid-rows-[1fr] group-focus-within/follow:opacity-100 motion-reduce:transform-none motion-reduce:transition-none">
          <ul className="flex min-h-0 flex-col gap-3 overflow-hidden px-1 pb-4 pt-1">
            {SOCIAL.footerProfiles.map((profile) => {
              const Icon = socialIcons[profile.label]

              return (
                <li key={profile.label}>
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Neo Follicle on ${profile.label}`}
                    title={profile.label}
                    className={`grid h-11 w-11 place-items-center rounded-full text-base ring-[3px] ring-base transition-[background-color,filter,transform] duration-300 hover:scale-110 hover:text-base focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transform-none ${
                      SOCIAL_COLORS[profile.label] ?? 'bg-primary hover:bg-primary-dark'
                    }`}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
