import { useEffect, useState } from 'react'
import { fetchAlbums, fetchIdols, type Album, type Idol } from '../lib/api'
import { pickRandomAlbums } from '../lib/pick-random'
import { AlbumCard } from '../components/home/AlbumCard'
import { IdolCard } from '../components/home/IdolCard'
import { EmptyCard, ErrorCard, SkeletonAlbumCard, SkeletonIdolCard } from '../components/home/StateCards'

const KEEPALIVE_MS = 14 * 60 * 1000
const ALBUM_SLOTS = 5

export default function HomePage() {
  const [idols, setIdols] = useState<Idol[] | null>(null)
  const [albums, setAlbums] = useState<Album[] | null>(null)
  const [idolIndex, setIdolIndex] = useState(0)
  const [albumCards, setAlbumCards] = useState<Album[]>([])
  const [idolsFailed, setIdolsFailed] = useState(false)
  const [albumsFailed, setAlbumsFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true

    void (async () => {
      const [idolsResult, albumsResult] = await Promise.allSettled([fetchIdols(), fetchAlbums()])
      if (!active) return

      if (idolsResult.status === 'fulfilled') {
        setIdols(idolsResult.value)
        setIdolsFailed(false)
        if (idolsResult.value.length > 0) {
          setIdolIndex(Math.floor(Math.random() * idolsResult.value.length))
        }
      } else {
        setIdols(null)
        setIdolsFailed(true)
      }

      if (albumsResult.status === 'fulfilled') {
        setAlbums(albumsResult.value)
        setAlbumsFailed(false)
        setAlbumCards(pickRandomAlbums(albumsResult.value, ALBUM_SLOTS))
      } else {
        setAlbums(null)
        setAlbumsFailed(true)
      }
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

  const fullyFailed = idolsFailed && albumsFailed

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
                  idolsFailed ? (
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
                  albumsFailed ? (
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
