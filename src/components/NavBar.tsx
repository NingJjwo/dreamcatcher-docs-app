import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-abyss-700 bg-abyss-950/85 px-10 py-5 backdrop-blur">
        <Link
          to="/"
          className="font-gothic text-sm font-semibold tracking-[0.2em] uppercase"
        >
          Dream<span className="text-teal">catcher</span>
        </Link>

        <div className="flex gap-6">
          <Link to="/docs" className="text-sm text-abyss-400 transition hover:text-mist">
            Grimoire
          </Link>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}
