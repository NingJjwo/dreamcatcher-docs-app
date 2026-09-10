import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-teal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-abyss-950 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-abyss-950"
      >
        Saltar al contenido
      </a>
      <nav
        aria-label="Principal"
        className="sticky top-0 z-10 flex items-center justify-between border-b border-abyss-700 bg-abyss-950/85 px-10 py-5 backdrop-blur"
      >
        <Link
          to="/"
          className="font-gothic text-sm font-semibold tracking-[0.2em] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        >
          Dream<span className="text-teal">catcher</span>
        </Link>

        <div className="flex gap-6">
          <Link
            to="/docs"
            className="text-sm text-abyss-400 transition hover:text-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            Grimoire
          </Link>
        </div>
      </nav>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="border-t border-abyss-700 py-8 text-center text-sm text-abyss-400">
        Dreamcatcher API — © 2026. Summoned from the abyss.
      </footer>
    </>
  );
}
