export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://dreamcatcher-api-4hw4.onrender.com'

const API_ORIGIN = new URL(API_BASE_URL).origin

function resolveImageUrl(path: string | null): string | null {
  if (!path) return null
  if (/^https?:\/\//.test(path)) return path
  return `${API_ORIGIN}${path.startsWith('/') ? '' : '/'}${path}`
}

export interface Idol {
  id: number;
  stageName: string;
  realName: string | null;
  nationality: string | null;
  loreConcept: string | null;
  imageUrl: string | null;
  positions: string[];
}

export interface Album {
  id: number;
  albumTitle: string;
  trackCount: number | null;
  releaseDate: number | null;
  albumType: string | null;
  albumImage: string | null;
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export function fetchIdols(): Promise<Idol[]> {
  return fetchJson<Idol[]>(`${API_BASE_URL}/api/idols`).then((data) =>
    data.map((idol) => ({ ...idol, imageUrl: resolveImageUrl(idol.imageUrl) })),
  );
}

export function fetchAlbums(): Promise<Album[]> {
  return fetchJson<Album[]>(`${API_BASE_URL}/api/albums`).then((data) =>
    data.map((album) => ({ ...album, albumImage: resolveImageUrl(album.albumImage) })),
  );
}