import { ConsularService, Media, NewsArticle } from '~/types';

/**
 * SSR-props slimmers. Payload populates relationships as complete documents
 * (a nav link to a service embeds the whole service, a rich-text internal
 * link embeds the whole target page), which pushed page data past 450 kB.
 * The UI only ever reads a handful of fields from populated docs:
 *
 * - media: `url` + `alt` (+ mime/width/height) — see media-field renderers
 * - linked docs: `relationTo` + `slug` for the href (get-action-href.ts),
 *   `title` as a label fallback
 *
 * `slimProps` rewrites any fetched tree to exactly that before it is returned
 * as page props. Collection cards (grids, related/sibling lists) are trimmed
 * separately via `pickServiceCard` / `pickNewsCard`.
 */

const MEDIA_KEEP = ['id', 'alt', 'url', 'mimeType', 'width', 'height'];
const LINKED_DOC_KEEP = ['id', 'slug', 'title'];

const SERVICE_CARD_KEEP = [
  'id',
  'title',
  'slug',
  'category',
  'group',
  'shortDescription',
  'order',
];

const NEWS_CARD_KEEP = [
  'id',
  'title',
  'slug',
  'category',
  'excerpt',
  'coverImage',
  'publishedDate',
  'author',
];

function isPlainObject(value: unknown): value is Record<string, any> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function isMediaDoc(value: unknown): value is Media {
  return (
    isPlainObject(value) &&
    typeof value.url === 'string' &&
    typeof value.filename === 'string' &&
    typeof value.mimeType === 'string'
  );
}

/** Keeps only `keys`, skipping `undefined` (Next refuses to serialize it). */
function pick<T>(doc: T, keys: string[]): T {
  const out: Record<string, any> = {};
  for (const key of keys) {
    const value = (doc as Record<string, any>)[key];
    if (value !== undefined) out[key] = value;
  }
  return out as T;
}

/** Card projection of a service for grids, sibling tabs and related lists. */
export function pickServiceCard(doc: ConsularService): ConsularService {
  return pick(doc, SERVICE_CARD_KEEP);
}

/** Card projection of an article for grids, listings and related lists. */
export function pickNewsCard(doc: NewsArticle): NewsArticle {
  return pick(doc, NEWS_CARD_KEEP);
}

/**
 * Deeply strips a fetched tree for use as SSR props: media documents keep
 * their render fields, populated `{ relationTo, value: doc }` pairs (action
 * references, rich-text links and uploads) keep what hrefs need. Everything
 * else passes through untouched.
 */
export default function slimProps<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(slimProps) as unknown as T;
  }
  if (!isPlainObject(value)) return value;
  if (isMediaDoc(value)) return pick(value, MEDIA_KEEP);

  const isRelationWrapper =
    typeof value.relationTo === 'string' && isPlainObject(value.value);

  const out: Record<string, any> = {};
  for (const [key, child] of Object.entries(value)) {
    if (isRelationWrapper && key === 'value') {
      out[key] = isMediaDoc(child)
        ? pick(child, MEDIA_KEEP)
        : pick(child, LINKED_DOC_KEEP);
    } else {
      out[key] = slimProps(child);
    }
  }
  return out as T;
}
