import { useState } from 'react'

const sections = [
  {
    id: 'groups',
    title: 'Groups',
    description: 'The covens behind the music — agencies, concepts, and full discographies.',
    endpoints: [
      { method: 'GET', path: '/api/groups', summary: 'List all groups' },
      { method: 'GET', path: '/api/groups/{id}', summary: 'A single group' },
    ],
  },
  {
    id: 'idols',
    title: 'Idols',
    description: 'Members of the night, searchable by stage name, group, position, and lore.',
    endpoints: [
      { method: 'GET', path: '/api/idols', summary: 'List all idols' },
      { method: 'GET', path: '/api/idols?name={stageName}', summary: 'Search by stage name' },
      { method: 'GET', path: '/api/idols/{id}', summary: 'A single idol' },
      { method: 'GET', path: '/api/idols/group/{groupId}', summary: 'Members of a group' },
    ],
  },
  {
    id: 'albums',
    title: 'Albums',
    description: 'Ritual releases catalogued with track counts and their date of summoning.',
    endpoints: [
      { method: 'GET', path: '/api/albums', summary: 'List all albums' },
      { method: 'GET', path: '/api/albums/{id}', summary: 'A single album' },
      { method: 'GET', path: '/api/albums/group/{groupId}', summary: 'Releases of a group' },
    ],
  },
  {
    id: 'songs',
    title: 'Songs',
    description: 'Every incantation in order — tracklists bound to their album.',
    endpoints: [
      { method: 'GET', path: '/api/songs', summary: 'List all songs' },
      { method: 'GET', path: '/api/songs/{id}', summary: 'A single song' },
      { method: 'GET', path: '/api/songs/album/{albumId}', summary: 'Songs of an album' },
    ],
  },
] as const

export default function DocsPage() {
  const [active, setActive] = useState('groups')
  const section = sections.find((s) => s.id === active) ?? sections[0]

  return (
    <section className="mx-auto flex w-full max-w-6xl gap-10 px-8 pt-14 pb-24">
      <aside className="w-56 shrink-0">
        <p className="mb-4 text-xs font-semibold tracking-[0.35em] text-teal uppercase">
          Grimoire
        </p>
        <nav className="flex flex-col gap-1">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={
                s.id === active
                  ? 'rounded border-l-2 border-teal bg-abyss-850 px-3 py-2 text-left font-gothic text-sm tracking-wider text-mist uppercase'
                  : 'rounded border-l-2 border-transparent px-3 py-2 text-left font-gothic text-sm tracking-wider text-abyss-400 uppercase transition hover:text-mist'
              }
            >
              {s.title}
            </button>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <h1 className="font-gothic text-4xl font-semibold tracking-[0.06em] text-mist uppercase">
          {section.title}
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-abyss-300">{section.description}</p>

        <div className="mt-8 space-y-4">
          {section.endpoints.map((endpoint) => (
            <article
              key={endpoint.path}
              className="rounded-lg border border-abyss-700 bg-abyss-850/80 p-5"
            >
              <div className="flex items-center gap-3">
                <span className="rounded bg-teal/15 px-2 py-1 text-xs font-bold text-teal">
                  {endpoint.method}
                </span>
                <code className="overflow-x-auto text-sm text-mist">{endpoint.path}</code>
              </div>
              <p className="mt-2 text-sm text-abyss-400">{endpoint.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
