import { memo, type ReactNode } from 'react'
import { API_BASE_URL } from '../lib/api'
import type { SchemaRow } from '../lib/docs-data'
import { highlightJson } from '../lib/highlight-json'

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-surface-container-lowest px-1.5 py-0.5 font-mono text-[0.85em] text-gold-light">
      {children}
    </code>
  )
}

export function RequestLine({ path }: { path: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-outline-variant/40 bg-surface-container-lowest p-4 font-mono text-xs leading-relaxed">
      <code>
        <span className="text-gold">GET </span>
        <span className="text-on-surface-variant">{API_BASE_URL}</span>
        <span className="text-on-surface">{path}</span>
      </code>
    </pre>
  )
}

export const JsonBlock = memo(function JsonBlock({ json }: { json: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-outline-variant/40 bg-surface-container-lowest p-4 font-mono text-xs leading-relaxed text-on-surface">
      <code>{highlightJson(json)}</code>
    </pre>
  )
})

export function SchemaTable({ rows }: { rows: SchemaRow[] }) {
  return (
    <table className="w-full border-collapse text-left text-sm">
      <thead>
        <tr className="border-b border-outline-variant/40">
          <th className="py-2 pr-4 font-mono text-xs uppercase tracking-wider text-gold">Key</th>
          <th className="py-2 pr-4 font-mono text-xs uppercase tracking-wider text-gold">Type</th>
          <th className="py-2 font-mono text-xs uppercase tracking-wider text-gold">Description</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-outline-variant/30">
        {rows.map((row) => (
          <tr key={row.key}>
            <td className="py-2.5 pr-4 align-top font-mono text-gold-light">{row.key}</td>
            <td className="py-2.5 pr-4 align-top font-mono text-crimson-glow">{row.type}</td>
            <td className="py-2.5 align-top text-on-surface-variant">{row.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function Heading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 border-b border-outline-variant/40 pb-2 font-headline text-3xl font-bold tracking-tight text-white">
      {children}
    </h2>
  )
}

export function Operation({
  id,
  title,
  description,
  path,
  json,
}: {
  id: string
  title: string
  description?: ReactNode
  path: string
  json?: string
}) {
  return (
    <div className="space-y-3">
      <h3 id={id} className="scroll-mt-24 font-headline text-xl font-semibold text-white">
        {title}
      </h3>
      {description && <p className="text-sm leading-relaxed text-abyss-300">{description}</p>}
      <RequestLine path={path} />
      {json && <JsonBlock json={json} />}
    </div>
  )
}
