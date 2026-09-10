import type { Idol } from '../../lib/api'

export function IdolCard({ idol, onShuffle }: { idol: Idol; onShuffle: () => void }) {
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
            #{String(idol.id).padStart(2, '0')}
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
