/** Rough reading time for Payload rich text (Slate JSON), ~200 words/minute. */
export default function readingTime(
  nodes?: { [k: string]: unknown }[] | null
): string {
  const words = countWords(nodes ?? []);
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function countWords(nodes: unknown[]): number {
  return nodes.reduce<number>((total, node) => {
    if (!node || typeof node !== 'object') return total;
    const record = node as { text?: unknown; children?: unknown };

    if (typeof record.text === 'string') {
      return total + record.text.split(/\s+/).filter(Boolean).length;
    }

    return Array.isArray(record.children)
      ? total + countWords(record.children)
      : total;
  }, 0);
}
