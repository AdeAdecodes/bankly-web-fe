import { Media } from '~/types';

export type MediaLike = string | Media | null | undefined;

/** Payload returns either an id string (unpopulated) or the Media document. */
export function asMedia(media: MediaLike): Media | undefined {
  return media && typeof media === 'object' ? media : undefined;
}

export function getMediaUrl(media: MediaLike): string | undefined {
  return asMedia(media)?.url ?? undefined;
}

export function getMediaAlt(media: MediaLike, fallback = ''): string {
  return asMedia(media)?.alt ?? fallback;
}

export function isVideoMedia(media: MediaLike): boolean {
  return !!asMedia(media)?.mimeType?.startsWith('video');
}

/** Same id-or-document duality for any relationship field. */
export function asDoc<T extends { id: string }>(
  value: string | T | null | undefined
): T | undefined {
  return value && typeof value === 'object' ? value : undefined;
}
