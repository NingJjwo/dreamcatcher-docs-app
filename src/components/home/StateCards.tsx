export function SkeletonIdolCard() {
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

export function SkeletonAlbumCard() {
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

export function ErrorCard({ detail, onRetry }: { detail: string; onRetry: () => void }) {
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

export function EmptyCard({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-crimson-dark/40 bg-surface-container px-6 py-8 text-center">
      <span aria-hidden="true" className="material-symbols-outlined text-[28px] text-outline">
        inbox
      </span>
      <p className="text-xs text-on-surface-variant">{label}</p>
    </div>
  )
}
