import { NewsArticle } from '~/types';
import fetchPayloadCollection from '../shared/fetch-payload-collection';

export default async function fetchNewsArticle(
  slug: string
): Promise<NewsArticle | null> {
  try {
    const result = await fetchPayloadCollection('news-articles', {
      where: { slug: { equals: slug } },
      depth: 1,
      limit: 1,
    });

    return result.docs[0] ?? null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`[fetchNewsArticle] failed for slug "${slug}"`, error);
    return null;
  }
}
