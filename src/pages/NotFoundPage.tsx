import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center px-8 text-center">
      <p className="text-xs font-semibold tracking-[0.35em] text-gold uppercase">
        Unknown territory
      </p>
      <h1 className="mt-6 font-headline text-6xl font-bold tracking-[0.06em] text-mist uppercase">
        404
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-abyss-400">
        This page does not exist in the archive. It may have been removed or never existed.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-md bg-gold px-7 py-3 font-headline text-sm font-semibold tracking-widest text-abyss-950 uppercase shadow-lg shadow-gold/30 transition hover:-translate-y-0.5 hover:brightness-110"
      >
        Back to home
      </Link>
    </section>
  )
}
