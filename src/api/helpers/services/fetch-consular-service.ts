import { ConsularService } from '~/types';
import fetchPayloadCollection from '../shared/fetch-payload-collection';

/** One service by slug, with related services, downloads and media populated. */
export default async function fetchConsularService(
  slug: string
): Promise<ConsularService | null> {
  try {
    const result = await fetchPayloadCollection('consular-services', {
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    });

    return result.docs[0] ?? null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`[fetchConsularService] failed for slug "${slug}"`, error);
    return null;
  }
}
