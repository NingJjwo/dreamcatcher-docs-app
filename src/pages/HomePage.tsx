import { useEffect, useState } from 'react'
import { fetchAlbums, fetchIdols, type Album, type Idol } from '../lib/api'

const KEEPALIVE_MS = 14 * 60 * 1000
const ALBUM_SLOTS = 5

function IdolCard({ idol, onShuffle }: { idol: Idol; onShuffle: () => void }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-crimson-dark/40 bg-surface-container shadow-lg transition-all duration-300 hover:border-crimson hover:shadow-[0_0_20px_rgba(209,26,56,0.25)] sm:flex-row">
      <div className="relative w-full shrink-0 overflow-hidden bg-surface-container-lowest sm:w-72">
        <div className="aspect-square w-full sm:aspect-auto sm:h-full">
          {idol.imageUrl ? (
            <img className="h-full w-full object-cover" src={idol.imageUrl} alt={`${idol.stageName} portrait`} />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span aria-hidden="true" className="material-symbols-outlined text-[40px] text-outline">
                image
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/70 via-transparent to-transparent sm:bg-gradient-to-r" />
          <span className="absolute top-3 left-3 rounded border border-gold/30 bg-surface-container-lowest/90 px-2 py-0.5 font-mono text-[10px] text-gold">
            #01
          </span>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 p-5 sm:p-6">
        <div>
          <h3 className="font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {idol.stageName}
          </h3>
          <div className="mt-1 font-mono text-xs text-outline">{idol.realName ?? '—'}</div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-gold/80">Positions</div>
            <div className="font-body text-sm text-on-surface">
              {idol.positions.length > 0 ? idol.positions.join(', ') : '—'}
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-gold/80">Nationality</div>
            <div className="font-body text-sm text-on-surface">{idol.nationality ?? '—'}</div>
          </div>
          <div className="col-span-2">
            <div className="font-mono text-[10px] uppercase tracking-wider text-outline">Lore concept</div>
            <div className="font-body text-sm text-on-surface-variant">{idol.loreConcept ?? '—'}</div>
          </div>
        </div>
        <div className="border-t border-outline-variant/30 pt-4">
          <button
            type="button"
            onClick={onShuffle}
            className="flex items-center gap-1.5 rounded border border-crimson-glow/30 bg-crimson px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-white shadow-[0_0_16px_rgba(209,26,56,0.45)] transition-all hover:bg-crimson-glow"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
              autorenew
            </span>
            Give me another
          </button>
        </div>
      </div>
    </article>
  )
}

function AlbumCard({ album }: { album: Album }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-crimson-dark/40 bg-surface-container shadow-lg transition-all duration-300 hover:border-crimson hover:shadow-[0_0_20px_rgba(209,26,56,0.25)]">
      <div className="relative aspect-square w-full overflow-hidden bg-surface-container-lowest">
        {album.albumImage ? (
          <img className="h-full w-full object-cover" src={album.albumImage} alt={`${album.albumTitle} cover`} loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span aria-hidden="true" className="material-symbols-outlined text-[32px] text-outline">
              image
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
        <h3 className="truncate font-headline text-lg font-bold tracking-tight text-white" title={album.albumTitle}>
          {album.albumTitle}
        </h3>
        <div className="truncate font-mono text-[10px] text-outline">{album.albumType ?? 'Album'}</div>
        <div className="mt-auto space-y-1">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-gold/80">Track count</div>
            <div className="truncate font-body text-xs text-on-surface">
              {album.trackCount != null ? `${album.trackCount} tracks` : '—'}
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-outline">Released</div>
            <div className="truncate font-body text-xs font-medium text-on-surface-variant">
              {album.releaseDate != null ? String(album.releaseDate) : '—'}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function SkeletonIdolCard() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-xl border border-crimson-dark/40 bg-surface-container sm:flex-row">
      <div className="aspect-square w-full bg-surface-container-lowest sm:w-72" />
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="h-7 w-40 rounded bg-surface-container-highest" />
        <div className="h-3 w-24 rounded bg-surface-container-high" />
        <div className="mt-2 h-3 w-32 rounded bg-surface-container-high" />
        <div className="h-3 w-48 rounded bg-surface-container-high" />
        <div className="mt-auto h-9 w-40 rounded bg-surface-container-high" />
      </div>
    </div>
  )
}

function SkeletonAlbumCard() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-xl border border-crimson-dark/40 bg-surface-container">
      <div className="aspect-square w-full bg-surface-container-lowest" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-4 w-28 rounded bg-surface-container-highest" />
        <div className="h-3 w-24 rounded bg-surface-container-high" />
        <div className="mt-1 h-3 w-full rounded bg-surface-container-high" />
      </div>
    </div>
  )
}

function ErrorCard({ detail, onRetry }: { detail: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-crimson-dark/40 bg-surface-container px-6 py-8 text-center">
      <span aria-hidden="true" className="material-symbols-outlined text-[32px] text-crimson-glow">
        cloud_off
      </span>
      <p className="max-w-[260px] text-xs text-on-surface-variant">{detail}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded bg-crimson px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide text-white hover:bg-crimson-glow"
      >
        Retry
      </button>
    </div>
  )
}

function EmptyCard({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-crimson-dark/40 bg-surface-container px-6 py-8 text-center">
      <span aria-hidden="true" className="material-symbols-outlined text-[28px] text-outline">
        inbox
      </span>
      <p className="text-xs text-on-surface-variant">{label}</p>
    </div>
  )
}

function pickRandomAlbums(albums: Album[], count: number): Album[] {
  if (albums.length <= count) return [...albums]
  const pool = [...albums]
  const chosen: Album[] = []
  while (chosen.length < count) {
    chosen.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0])
  }
  return chosen
}

export default function HomePage() {
  const [idols, setIdols] = useState<Idol[] | null>(null)
  const [albums, setAlbums] = useState<Album[] | null>(null)
  const [idolIndex, setIdolIndex] = useState(0)
  const [albumCards, setAlbumCards] = useState<Album[]>([])
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true

    void (async () => {
      const [idolsResult, albumsResult] = await Promise.allSettled([fetchIdols(), fetchAlbums()])
      if (!active) return

      if (idolsResult.status === 'fulfilled') {
        setIdols(idolsResult.value)
        if (idolsResult.value.length > 0) {
          setIdolIndex(Math.floor(Math.random() * idolsResult.value.length))
        }
      } else {
        setIdols(null)
      }

      if (albumsResult.status === 'fulfilled') {
        setAlbums(albumsResult.value)
        setAlbumCards(pickRandomAlbums(albumsResult.value, ALBUM_SLOTS))
      } else {
        setAlbums(null)
      }

      const failed: string[] = []
      if (idolsResult.status !== 'fulfilled') failed.push('idols')
      if (albumsResult.status !== 'fulfilled') failed.push('albums')
      setError(
        failed.length > 0
          ? `Could not reach the Dreamcatcher API to load ${failed.join(' and ')}.`
          : null,
      )
    })()

    return () => {
      active = false
    }
  }, [attempt])

  useEffect(() => {
    const timer = window.setInterval(() => {
      fetchIdols()
        .then((list) => {
          if (list.length === 0) return
          setIdols(list)
          setIdolIndex(Math.floor(Math.random() * list.length))
        })
        .catch(() => {})
    }, KEEPALIVE_MS)
    return () => window.clearInterval(timer)
  }, [])

  const shuffleIdol = () => {
    if (!idols || idols.length < 2) return
    setIdolIndex((current) => {
      let next = Math.floor(Math.random() * idols.length)
      if (next === current) next = (next + 1) % idols.length
      return next
    })
  }

  const retry = () => setAttempt((current) => current + 1)

  const idolsError = error !== null && error.includes('idols')
  const albumsError = error !== null && error.includes('albums')
  const fullyFailed = idolsError && albumsError

  return (
    <div className="flex w-full flex-col bg-surface-dim">
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[400px] w-[1000px] -translate-x-1/2 bg-gradient-to-b from-crimson/15 via-gold/5 to-transparent blur-3xl" />
        <section className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-16 pb-14 text-center sm:px-6 sm:pt-24 sm:pb-20 lg:px-8">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-surface-container-low px-4 py-1.5 text-gold-light shadow-[0_0_12px_rgba(209,26,56,0.2)]">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-crimson-glow shadow-[0_0_8px_#e6194b]" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-gold">
              Dreamcatcher Developer Portal · REST API
            </span>
          </div>
          <h1 className="max-w-4xl font-headline text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
            The Dreamcatcher API
          </h1>
          <div className="mt-4 font-headline text-lg font-medium tracking-wide text-gold italic sm:text-2xl">
            드림캐쳐 데이터베이스
          </div>
          <p className="mt-7 max-w-3xl font-body text-base leading-relaxed text-on-surface-variant sm:text-lg">
            A comprehensive REST API serving full discography, member nightmare lore, album
            tracklists, music video timelines, and concert data for InSomnia &amp; developers.
          </p>
        </section>
      </div>

      <section id="endpoints" className="w-full bg-surface-dim py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-crimson-glow">
                <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                  sensors
                </span>
                <span>API Responses · Live Sample Data</span>
              </div>
              <h2 className="mt-1 font-headline text-2xl tracking-tight text-white sm:text-3xl">
                Live Query Responses
              </h2>
            </div>
          </div>

          {fullyFailed ? (
            <ErrorCard
              detail="Could not reach the Dreamcatcher API. It may be offline or still seeding the database."
              onRetry={retry}
            />
          ) : (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                {idols === null ? (
                  idolsError ? (
                    <ErrorCard detail="Could not load idols from the API." onRetry={retry} />
                  ) : (
                    <SkeletonIdolCard />
                  )
                ) : idols.length === 0 ? (
                  <EmptyCard label="No idols available yet." />
                ) : (
                  <div className="max-w-4xl">
                    <IdolCard idol={idols[idolIndex]} onShuffle={shuffleIdol} />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-crimson-glow">
                  <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                    album
                  </span>
                  <span>Albums</span>
                </div>
                {albums === null ? (
                  albumsError ? (
                    <ErrorCard detail="Could not load albums from the API." onRetry={retry} />
                  ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                      {Array.from({ length: ALBUM_SLOTS }).map((_, i) => (
                        <SkeletonAlbumCard key={i} />
                      ))}
                    </div>
                  )
                ) : albums.length === 0 ? (
                  <EmptyCard label="No albums available yet." />
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {albumCards.map((album) => (
                      <AlbumCard key={album.id} album={album} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}