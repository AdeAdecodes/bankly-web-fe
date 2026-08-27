import fetchPayloadCollection from '../shared/fetch-payload-collection';

export type FetchNewsArticlesOptions = {
  limit?: number;
  page?: number;
  category?: string | null;
  excludeId?: string;
};

export default function fetchNewsArticles({
  limit = 12,
  page = 1,
  category,
  excludeId,
}: FetchNewsArticlesOptions = {}) {
  const where: Record<string, unknown> = {};

  if (category) where.category = { equals: category };
  if (excludeId) where.id = { not_equals: excludeId };

  return fetchPayloadCollection('news-articles', {
    where,
    sort: '-publishedDate',
    limit,
    page,
    depth: 1,
  });
}
