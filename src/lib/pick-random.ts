export function pickRandomAlbums<T>(items: T[], count: number): T[] {
  if (items.length <= count) return [...items]
  const pool = [...items]
  const chosen: T[] = []
  while (chosen.length < count) {
    chosen.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0])
  }
  return chosen
}
