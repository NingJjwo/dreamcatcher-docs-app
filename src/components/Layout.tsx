import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-crimson focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-surface-dim"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className="sticky top-0 z-50 border-b border-crimson-dark/40 bg-[#0b0b10]/90 shadow-[0_4px_24px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      >
        <div className="flex h-16 items-center justify-between gap-4 px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-crimson via-crimson-dark to-[#13121a] p-[1px] shadow-[0_0_12px_rgba(209,26,56,0.5)]">
              <div className="flex w-full h-full items-center justify-center rounded-full border border-gold/30 bg-surface-dim">
                <span aria-hidden="true" className="material-symbols-outlined text-[17px] text-gold">
                  bedtime
                </span>
              </div>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 text-on-surface transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="font-headline text-lg font-bold tracking-tight text-white sm:text-xl">
                Dreamcatcher API
              </span>
              <span className="rounded bg-crimson-dark/50 px-1.5 py-0.5 font-mono text-[10px] uppercase text-gold-light border border-crimson/40">
                v1.0
              </span>
            </Link>
          </div>

          <Link
            to="/docs"
            className="rounded bg-crimson px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-white shadow-[0_0_16px_rgba(209,26,56,0.45)] transition-all hover:bg-crimson-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border border-crimson-glow/30"
          >
            Docs
          </Link>
        </div>
      </nav>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="w-full border-t border-crimson-dark/40 bg-surface-container-lowest py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-4 font-mono text-xs text-on-surface-variant">
              <Link to="/docs" className="transition-colors hover:text-gold">
                OpenAPI Schema 3.1
              </Link>
              <Link to="/docs" className="transition-colors hover:text-gold">
                Nightmare Canon DB
              </Link>
            </div>
            <div className="text-center font-body text-xs text-outline sm:text-right">
              © 2026 Dreamcatcher API Project. Built for InSomnia &amp; developers. All music
              rights belong to Dreamcatcher Company.
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
