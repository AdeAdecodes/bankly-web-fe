import fetchPayloadCollection from '../shared/fetch-payload-collection';

export type FetchConsularServicesOptions = {
  category?: string | null;
  limit?: number;
  depth?: number;
};

export default function fetchConsularServices({
  category,
  limit = 100,
  depth = 0,
}: FetchConsularServicesOptions = {}) {
  const where: Record<string, unknown> = {};

  if (category) where.category = { equals: category };

  return fetchPayloadCollection('consular-services', {
    where,
    sort: 'order',
    limit,
    depth,
  });
}
