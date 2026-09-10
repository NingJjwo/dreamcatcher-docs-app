import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../lib/api'
import {
  albumJson,
  albumSchema,
  allIds,
  arrayWrap,
  errorJson,
  errorSchema,
  firstAlbumJson,
  firstSongJson,
  groupDetailJson,
  groupJson,
  groupSchema,
  idolJson,
  idolSchema,
  nightmareSongJson,
  songJson,
  songSchema,
  toc,
} from '../lib/docs-data'
import { Heading, InlineCode, JsonBlock, Operation, RequestLine, SchemaTable } from '../components/DocsBlocks'

export default function DocsPage() {
  const [active, setActive] = useState('introduction')

  useEffect(() => {
    const elements = allIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex w-full gap-16 px-6 pt-10 pb-24 lg:px-10">
      <aside className="hidden w-64 shrink-0 md:block">
        <nav aria-label="Documentation" className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
          {toc.map((section) => (
            <div key={section.id} className="mb-4">
              <a
                href={`#${section.id}`}
                className={
                  active === section.id
                    ? 'block font-headline text-base font-bold text-gold'
                    : 'block font-headline text-base font-bold text-on-surface transition-colors hover:text-gold'
                }
              >
                {section.label}
              </a>
              {section.items.length > 0 && (
                <ul className="mt-1 space-y-0.5 border-l border-outline-variant/40 pl-3">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        aria-current={active === item.id ? 'true' : undefined}
                        className={
                          active === item.id
                            ? 'block py-0.5 text-sm text-gold'
                            : 'block py-0.5 text-sm text-abyss-400 transition-colors hover:text-mist'
                        }
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1 space-y-14">
        <section className="space-y-6">
          <Heading id="introduction">Introduction</Heading>
          <p className="leading-relaxed text-abyss-300">
            A read-only REST API serving data about the K-pop group{' '}
            <strong className="text-mist">Dreamcatcher</strong> — members, discography, albums, and
            songs. Every response returns camelCase JSON from Java record DTOs, and errors follow
            the RFC 9457 ProblemDetail format.
          </p>
          <div className="flex flex-wrap gap-2">
            {['1 group', '7 idols', '34 albums', '161 songs', '14 positions'].map((stat) => (
              <span
                key={stat}
                className="rounded-full border border-crimson/30 bg-surface-container-low px-3 py-1 font-mono text-[11px] text-gold"
              >
                {stat}
              </span>
            ))}
          </div>

          <div className="space-y-3">
            <h3 id="rest" className="scroll-mt-24 font-headline text-xl font-semibold text-white">
              REST
            </h3>
            <p className="text-sm leading-relaxed text-abyss-300">
              <strong className="text-mist">Base url:</strong>{' '}
              <a
                href={API_BASE_URL}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-gold underline decoration-crimson/40 underline-offset-2 hover:text-gold-light"
              >
                {API_BASE_URL}
              </a>
            </p>
            <p className="text-sm leading-relaxed text-abyss-300">
              All requests are <InlineCode>GET</InlineCode> requests and go over{' '}
              <InlineCode>https</InlineCode>. All responses return data in{' '}
              <InlineCode>json</InlineCode>.
            </p>
            <RequestLine path="" />
            <p className="text-sm leading-relaxed text-abyss-300">
              There are currently four available resources:
            </p>
            <ul className="space-y-1 text-sm text-abyss-300">
              {[
                ['#group', 'Group'],
                ['#idol', 'Idol'],
                ['#album', 'Album'],
                ['#song', 'Song'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-gold hover:text-gold-light">
                    {label}
                  </a>
                  : {href === '#group' && 'get group data.'}
                  {href === '#idol' && 'get all the idols and members.'}
                  {href === '#album' && 'get all the albums and releases.'}
                  {href === '#song' && 'get all the songs.'}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <Heading id="stack">Stack</Heading>
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-outline-variant/40">
                <th className="py-2 pr-4 font-mono text-xs uppercase tracking-wider text-gold">Layer</th>
                <th className="py-2 font-mono text-xs uppercase tracking-wider text-gold">Tech</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {[
                ['Language', 'Java 21'],
                ['Framework', 'Spring Boot 4.0.6 (Web MVC)'],
                ['Persistence', 'Spring Data JPA (Hibernate) → PostgreSQL (Supabase)'],
                ['Docs', 'SpringDoc OpenAPI 3.0.2 (Swagger UI auto-generated)'],
                ['Build', 'Gradle 9.4.1'],
                ['Mapping', 'Java record DTOs, camelCase JSON'],
              ].map(([layer, tech]) => (
                <tr key={layer}>
                  <td className="py-2.5 pr-4 align-top text-on-surface-variant">{layer}</td>
                  <td className="py-2.5 text-on-surface">{tech}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="space-y-6">
          <Heading id="group">Group</Heading>
          <div className="space-y-3">
            <h3 id="group-schema" className="scroll-mt-24 font-headline text-xl font-semibold text-white">
              Group schema
            </h3>
            <SchemaTable rows={groupSchema} />
            <p className="text-sm leading-relaxed text-abyss-300">
              The single-group endpoint returns a <InlineCode>GroupDetailResponseDto</InlineCode>,
              which adds a <InlineCode>members</InlineCode> array of{' '}
              <InlineCode>IdolResponseDto</InlineCode>.
            </p>
          </div>

          <Operation id="get-all-groups" title="Get all groups" path="/api/groups" json={arrayWrap(groupJson)} />
          <Operation id="get-a-single-group" title="Get a single group" path="/api/groups/1" json={groupDetailJson} />
          <Operation id="get-group-albums" title="Get group albums" path="/api/groups/1/albums" json={arrayWrap(firstAlbumJson)} />
          <Operation id="get-group-idols" title="Get group idols" path="/api/groups/1/idols" json={arrayWrap(idolJson)} />
        </section>

        <section className="space-y-6">
          <Heading id="idol">Idol</Heading>
          <div className="space-y-3">
            <h3 id="idol-schema" className="scroll-mt-24 font-headline text-xl font-semibold text-white">
              Idol schema
            </h3>
            <SchemaTable rows={idolSchema} />
          </div>

          <Operation id="get-all-idols" title="Get all idols" path="/api/idols" json={arrayWrap(idolJson)} />
          <Operation id="get-a-single-idol" title="Get a single idol" path="/api/idols/1" json={idolJson} />

          <div className="space-y-3">
            <h3 id="filter-idols" className="scroll-mt-24 font-headline text-xl font-semibold text-white">
              Filter idols
            </h3>
            <p className="text-sm leading-relaxed text-abyss-300">
              You can filter idols by adding a <InlineCode>?</InlineCode> followed by the query{' '}
              <InlineCode>&lt;name&gt;=&lt;value&gt;</InlineCode>.
            </p>
            <RequestLine path="/api/idols?name=ji" />
            <ul className="space-y-1 text-sm text-abyss-300">
              <li>
                <InlineCode>name</InlineCode>: filter by the given stage name.
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <Heading id="album">Album</Heading>
          <div className="space-y-3">
            <h3 id="album-schema" className="scroll-mt-24 font-headline text-xl font-semibold text-white">
              Album schema
            </h3>
            <SchemaTable rows={albumSchema} />
            <p className="text-sm leading-relaxed text-abyss-300">
              <InlineCode>releaseDate</InlineCode> is an integer year and{' '}
              <InlineCode>trackCount</InlineCode> an integer.
            </p>
          </div>

          <Operation id="get-all-albums" title="Get all albums" path="/api/albums" json={arrayWrap(firstAlbumJson)} />
          <Operation id="get-a-single-album" title="Get a single album" path="/api/albums/3" json={albumJson} />
          <Operation id="get-album-songs" title="Get album songs" path="/api/albums/3/songs" json={arrayWrap(nightmareSongJson)} />
        </section>

        <section className="space-y-6">
          <Heading id="song">Song</Heading>
          <div className="space-y-3">
            <h3 id="song-schema" className="scroll-mt-24 font-headline text-xl font-semibold text-white">
              Song schema
            </h3>
            <SchemaTable rows={songSchema} />
          </div>

          <Operation id="get-all-songs" title="Get all songs" path="/api/songs" json={arrayWrap(firstSongJson)} />
          <Operation id="get-a-single-song" title="Get a single song" path="/api/songs/10" json={songJson} />
        </section>

        <section className="space-y-6">
          <Heading id="errors">Errors</Heading>
          <div className="space-y-3">
            <h3 id="problem-detail" className="scroll-mt-24 font-headline text-xl font-semibold text-white">
              Problem detail
            </h3>
            <p className="text-sm leading-relaxed text-abyss-300">
              Errors follow RFC 9457 and are served as{' '}
              <InlineCode>application/problem+json</InlineCode>.
            </p>
            <SchemaTable rows={errorSchema} />
            <JsonBlock json={errorJson} />
          </div>

          <div className="space-y-3">
            <h3 id="error-types" className="scroll-mt-24 font-headline text-xl font-semibold text-white">
              Error types
            </h3>
            <ul className="space-y-2 text-sm text-abyss-300">
              {[
                ['resource-not-found', '404'],
                ['validation', '400 — adds errors: [{field, message}]'],
                ['malformed-body', '400'],
                ['method-not-allowed', '405'],
                ['endpoint-not-found', '404'],
                ['data-access', '503'],
                ['internal', '500'],
              ].map(([type, status]) => (
                <li key={type} className="flex items-baseline gap-2">
                  <span className="w-40 shrink-0 font-mono text-xs text-gold-light">{type}</span>
                  <span className="text-abyss-400">{status}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
