import type { ReactNode } from 'react'

export function highlightJson(json: string): ReactNode[] {
  const regex =
    /("(?:[^"\\]|\\.)*")(?=\s*:)|("(?:[^"\\]|\\.)*")|(-?\d+(?:\.\d+)?)|(\btrue\b|\bfalse\b|\bnull\b)|([{}[\],:])/g
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(json)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(json.slice(lastIndex, match.index))
    }
    const [full, keyToken, stringToken, numberToken, keywordToken, punctToken] = match
    if (keyToken) {
      nodes.push(
        <span key={key++} className="text-gold">
          {keyToken}
        </span>,
      )
    } else if (stringToken) {
      nodes.push(
        <span key={key++} className="text-gold-light">
          {stringToken}
        </span>,
      )
    } else if (numberToken) {
      nodes.push(
        <span key={key++} className="text-crimson-glow">
          {numberToken}
        </span>,
      )
    } else if (keywordToken) {
      nodes.push(
        <span key={key++} className="text-gold">
          {keywordToken}
        </span>,
      )
    } else if (punctToken) {
      nodes.push(
        <span key={key++} className="text-outline">
          {punctToken}
        </span>,
      )
    }
    lastIndex = match.index + full.length
  }
  if (lastIndex < json.length) {
    nodes.push(json.slice(lastIndex))
  }
  return nodes
}
