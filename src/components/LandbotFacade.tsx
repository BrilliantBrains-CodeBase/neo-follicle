import { useEffect, useRef, useState } from 'react'
import { CheckCircle } from './icons'
import Reveal from './Reveal'
import { BUTTON } from './treatment/shell'

/**
 * The Landbot chatbot, behind a facade -- the same pattern YouTubeFacade uses,
 * and for the same two reasons.
 *
 * WHY A FACADE AND NOT THE EMBED. The site is prerendered (`vite build --ssr`
 * -> scripts/prerender.mjs) and scripts/verify-seo.mjs reads the STATIC HTML,
 * so nothing that matters may depend on JS to become visible -- the constraint
 * Reveal.tsx and Faq.tsx both document. Landbot's SDK builds its UI entirely
 * at runtime, so a bare embed would prerender to an empty <div>: a blank page
 * to a crawler, and a blank page to anyone whose script load fails.
 *
 * It is also ~200KB of third-party JavaScript plus a config fetch, loaded on a
 * page most visitors reach from an ad. Behind a facade none of it is requested
 * until someone actually chooses to start the assessment.
 *
 * WHAT SHIPS IN THE HTML is the panel below: the heading, the steps and the
 * button. That is real, readable content at first byte. The SDK replaces the
 * panel only after a click.
 *
 * NO `dangerouslySetInnerHTML` AND NO <script> IN THE TREE. React does not
 * execute a <script> it renders, so the SDK is attached to <head> by hand and
 * de-duplicated by id -- mounting the component twice must not load it twice.
 */

/** The global the SDK installs. Narrow by design: we call one constructor. */
type LandbotGlobal = {
  Fullpage: new (opts: { container: HTMLElement; configUrl: string }) => unknown
}

declare global {
  interface Window {
    Landbot?: LandbotGlobal
  }
}

const SDK_ID = 'landbot-sdk'
const SDK_SRC = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs'

/** Loads the SDK once per document and resolves when `window.Landbot` exists. */
function loadSdk(): Promise<LandbotGlobal> {
  if (window.Landbot) return Promise.resolve(window.Landbot)

  return new Promise((resolve, reject) => {
    const existing = document.getElementById(SDK_ID) as HTMLScriptElement | null
    const script = existing ?? document.createElement('script')

    const done = () => (window.Landbot ? resolve(window.Landbot) : reject(new Error('Landbot missing')))

    script.addEventListener('load', done, { once: true })
    script.addEventListener('error', () => reject(new Error('Landbot SDK failed to load')), { once: true })

    if (!existing) {
      script.id = SDK_ID
      script.type = 'module'
      script.async = true
      script.src = SDK_SRC
      document.head.appendChild(script)
    }
  })
}

export default function LandbotFacade({
  configUrl,
  heading,
  lede,
  steps,
  startLabel = 'Start Free Hair Assessment',
  note,
}: {
  /** The bot's index.json, e.g. .../v3/H-3082458-XXXX/index.json */
  configUrl: string
  heading: string
  lede?: string
  /** The "How does it work?" steps, shown until the bot is started. */
  steps?: { title: string; body: string }[]
  startLabel?: string
  /** A quieter line under the button -- e.g. how long it takes. */
  note?: string
}) {
  const [state, setState] = useState<'idle' | 'loading' | 'running' | 'error'>('idle')
  const container = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (state !== 'loading') return
    let cancelled = false

    loadSdk()
      .then((Landbot) => {
        if (cancelled || !container.current) return
        new Landbot.Fullpage({ container: container.current, configUrl })
        setState('running')
      })
      .catch(() => {
        if (!cancelled) setState('error')
      })

    return () => {
      cancelled = true
    }
  }, [state, configUrl])

  return (
    <section className="bg-surface py-section-y-mobile md:py-section-y-tablet lg:py-section-y">
      <div className="container">
        <Reveal className="mx-auto flex max-w-[860px] flex-col items-center gap-6 rounded-lg border border-line bg-base p-6 text-center md:p-10">
          <h2 className="text-balance font-head text-h2 text-secondary">{heading}</h2>
          {lede && <p className="max-w-[60ch] text-body-lg text-body">{lede}</p>}

          {/*
            The bot mounts here. It is kept in the tree at all times rather than
            swapped in, because the SDK needs a real element to attach to before
            it will build anything -- `hidden` until it is running so the empty
            box does not reserve height on a page nobody has started.
          */}
          <div
            ref={container}
            className={state === 'running' ? 'h-[640px] w-full overflow-hidden rounded' : 'hidden'}
          />

          {state !== 'running' && (
            <>
              {steps && (
                <ol className="grid w-full gap-gap-sm text-left md:grid-cols-3">
                  {steps.map((step, i) => (
                    <li
                      key={step.title}
                      className={`flex flex-col gap-2 rounded border border-line p-5 ${
                        i === 0 ? 'bg-accent' : 'bg-surface'
                      }`}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-pill bg-base font-head text-h6 text-primary">
                        {i + 1}
                      </span>
                      <h3 className="font-head text-h6 text-secondary">{step.title}</h3>
                      <p className="text-body">{step.body}</p>
                    </li>
                  ))}
                </ol>
              )}

              <button
                type="button"
                onClick={() => setState('loading')}
                disabled={state === 'loading'}
                className={`${BUTTON} bg-primary text-white hover:bg-primary-dark disabled:opacity-70`}
              >
                <CheckCircle className="h-5 w-5" aria-hidden="true" />
                {state === 'loading' ? 'Starting…' : startLabel}
              </button>

              {note && state === 'idle' && <p className="text-body text-body">{note}</p>}

              {/*
                A dead end is worse than a slow one: the phone number is in the
                header and the sticky bar, but someone who has just been told
                the tool is broken should not have to go looking.
              */}
              {state === 'error' && (
                <p role="alert" className="text-body text-body">
                  The assessment could not be loaded. Please{' '}
                  <a href="tel:+919731207940" className="text-primary underline hover:text-primary-dark">
                    call +91 97312 07940
                  </a>{' '}
                  and we will take you through it.
                </p>
              )}
            </>
          )}
        </Reveal>
      </div>
    </section>
  )
}
