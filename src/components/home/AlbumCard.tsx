import type { Album } from '../../lib/api'

export function AlbumCard({ album }: { album: Album }) {
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
