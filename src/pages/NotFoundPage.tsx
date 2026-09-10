import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center px-8 text-center">
      <p className="text-xs font-semibold tracking-[0.35em] text-teal uppercase">
        Zona desconocida
      </p>
      <h1 className="mt-6 font-gothic text-6xl font-bold tracking-[0.06em] text-mist uppercase">
        404
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-abyss-400">
        Esta pagina no existe en el grimorio. Puede que haya sido borrada o nunca haya existido.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-md bg-teal px-7 py-3 font-gothic text-sm font-semibold tracking-widest text-abyss-950 uppercase shadow-lg shadow-teal/30 transition hover:-translate-y-0.5 hover:brightness-110"
      >
        Volver al inicio
      </Link>
    </section>
  )
}
