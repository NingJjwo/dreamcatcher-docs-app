export interface SchemaRow {
  key: string
  type: string
  description: string
}

export interface TocItem {
  id: string
  label: string
}

export interface TocSection {
  id: string
  label: string
  items: TocItem[]
}

export const toc: TocSection[] = [
  {
    id: 'introduction',
    label: 'Introduction',
    items: [{ id: 'rest', label: 'REST' }],
  },
  { id: 'stack', label: 'Stack', items: [] },
  {
    id: 'group',
    label: 'Group',
    items: [
      { id: 'group-schema', label: 'Group schema' },
      { id: 'get-all-groups', label: 'Get all groups' },
      { id: 'get-a-single-group', label: 'Get a single group' },
      { id: 'get-group-albums', label: 'Get group albums' },
      { id: 'get-group-idols', label: 'Get group idols' },
    ],
  },
  {
    id: 'idol',
    label: 'Idol',
    items: [
      { id: 'idol-schema', label: 'Idol schema' },
      { id: 'get-all-idols', label: 'Get all idols' },
      { id: 'get-a-single-idol', label: 'Get a single idol' },
      { id: 'filter-idols', label: 'Filter idols' },
    ],
  },
  {
    id: 'album',
    label: 'Album',
    items: [
      { id: 'album-schema', label: 'Album schema' },
      { id: 'get-all-albums', label: 'Get all albums' },
      { id: 'get-a-single-album', label: 'Get a single album' },
      { id: 'get-album-songs', label: 'Get album songs' },
    ],
  },
  {
    id: 'song',
    label: 'Song',
    items: [
      { id: 'song-schema', label: 'Song schema' },
      { id: 'get-all-songs', label: 'Get all songs' },
      { id: 'get-a-single-song', label: 'Get a single song' },
    ],
  },
  {
    id: 'errors',
    label: 'Errors',
    items: [
      { id: 'problem-detail', label: 'Problem detail' },
      { id: 'error-types', label: 'Error types' },
    ],
  },
]

export const allIds = toc.flatMap((section) => [section.id, ...section.items.map((item) => item.id)])

export const groupJson = `{
  "id": 1,
  "groupName": "Dreamcatcher",
  "agencyName": "Dreamcatcher Company",
  "concept": "Rock & Dark Fantasy",
  "groupImage": "/images/dreamcatcher/dreamcatcher_logo.jpg"
}`

export const groupDetailJson = `{
  "id": 1,
  "groupName": "Dreamcatcher",
  "agencyName": "Dreamcatcher Company",
  "concept": "Rock & Dark Fantasy",
  "groupImage": "/images/dreamcatcher/dreamcatcher_logo.jpg",
  "members": [
    {
      "id": 1,
      "stageName": "JiU",
      "realName": "Kim Minji",
      "nationality": "South Korean",
      "loreConcept": "Nightmare of being chased",
      "imageUrl": "/images/dreamcatcher/idols/jiu.png",
      "positions": ["Lead Dancer", "Lead Vocalist", "Visual", "Leader"]
    },
    ...
  ]
}`

export const idolJson = `{
  "id": 1,
  "stageName": "JiU",
  "realName": "Kim Minji",
  "nationality": "South Korean",
  "loreConcept": "Nightmare of being chased",
  "imageUrl": "/images/dreamcatcher/idols/jiu.png",
  "positions": ["Lead Dancer", "Lead Vocalist", "Visual", "Leader"]
}`

export const firstAlbumJson = `{
  "id": 1,
  "albumTitle": "Why Did You Come To My Home?",
  "trackCount": 2,
  "releaseDate": 2014,
  "albumType": "Single",
  "albumImage": "/images/dreamcatcher/albums/album1.jpeg"
}`

export const albumJson = `{
  "id": 3,
  "albumTitle": "Nightmare",
  "trackCount": 4,
  "releaseDate": 2017,
  "albumType": "Single",
  "albumImage": "/images/dreamcatcher/albums/album3.jpeg"
}`

export const firstSongJson = `{
  "id": 1,
  "songName": "Why Did You Come To My Home? (우리 집에 왜 왔니)",
  "trackNumber": 1
}`

export const songJson = `{
  "id": 10,
  "songName": "Chase Me",
  "trackNumber": 2
}`

export const nightmareSongJson = `{
  "id": 9,
  "songName": "Welcome to Dream",
  "trackNumber": 1
}`

export const arrayWrap = (item: string) => `[\n  ${item.replace(/\n/g, '\n  ')},\n  ...\n]`

export const errorJson = `{
  "type": "https://api.dreamcatcher.dev/errors/resource-not-found",
  "title": "Not Found",
  "status": 404,
  "detail": "Idol with id [999] not found",
  "instance": "/api/idols/999"
}`

export const groupSchema: SchemaRow[] = [
  { key: 'id', type: 'int', description: 'The id of the group.' },
  { key: 'groupName', type: 'string', description: 'The name of the group.' },
  { key: 'agencyName', type: 'string', description: 'The agency the group belongs to.' },
  { key: 'concept', type: 'string', description: "The group's musical concept." },
  { key: 'groupImage', type: 'string (url)', description: 'Relative path to the group logo, resolved against the API origin.' },
]

export const idolSchema: SchemaRow[] = [
  { key: 'id', type: 'int', description: 'The id of the idol.' },
  { key: 'stageName', type: 'string', description: 'The stage name.' },
  { key: 'realName', type: 'string', description: 'The real (birth) name.' },
  { key: 'nationality', type: 'string', description: "The idol's nationality." },
  { key: 'loreConcept', type: 'string', description: "The idol's nightmare lore concept." },
  { key: 'imageUrl', type: 'string (url)', description: 'Relative path to the idol portrait, resolved against the API origin.' },
  { key: 'positions', type: 'array (string)', description: 'List of positions the idol holds in the group.' },
]

export const albumSchema: SchemaRow[] = [
  { key: 'id', type: 'int', description: 'The id of the album.' },
  { key: 'albumTitle', type: 'string', description: 'The title of the album.' },
  { key: 'trackCount', type: 'int', description: 'Number of tracks on the album.' },
  { key: 'releaseDate', type: 'int', description: 'Release year (integer).' },
  { key: 'albumType', type: 'string', description: 'Type of release (Single, EP, Album).' },
  { key: 'albumImage', type: 'string (url)', description: 'Relative path to the album cover, resolved against the API origin.' },
]

export const songSchema: SchemaRow[] = [
  { key: 'id', type: 'int', description: 'The id of the song.' },
  { key: 'songName', type: 'string', description: 'The title of the song.' },
  { key: 'trackNumber', type: 'int', description: 'Position in the album tracklist.' },
]

export const errorSchema: SchemaRow[] = [
  { key: 'type', type: 'string (url)', description: 'URI reference that identifies the problem type.' },
  { key: 'title', type: 'string', description: 'Short, human-readable summary of the problem.' },
  { key: 'status', type: 'int', description: 'HTTP status code.' },
  { key: 'detail', type: 'string', description: 'Human-readable explanation specific to this occurrence.' },
  { key: 'instance', type: 'string (url)', description: 'The request path that caused the error.' },
]
