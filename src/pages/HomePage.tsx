import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      <section
        className="relative flex min-h-[calc(100vh-73px)] items-center justify-center overflow-hidden px-8"
        style={{
          backgroundImage: "url('/images/landing-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-abyss-950/85 via-abyss-950/60 to-abyss-950" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.35em] text-teal uppercase">
            Welcome to the abyss
          </p>
          <h1 className="mt-6 font-gothic text-6xl font-bold tracking-[0.08em] uppercase md:text-8xl">
            Dream<span className="text-mist">catcher</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-abyss-300">
            A dark fantasy archive of the K-pop world. Groups, idols, albums, and songs —
            each bound to the API and waiting to be summoned.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/docs"
              className="rounded-md bg-teal px-7 py-3 font-gothic text-sm font-semibold tracking-widest text-abyss-950 uppercase shadow-lg shadow-teal/30 transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Read the grimoire
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-abyss-700 py-8 text-center text-sm text-abyss-400">
        Dreamcatcher API — © 2026. Summoned from the abyss.
      </footer>
    </>
  )
}
