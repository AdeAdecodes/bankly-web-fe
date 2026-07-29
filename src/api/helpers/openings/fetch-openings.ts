import fetchPayloadCollection from '../shared/fetch-payload-collection';

export default async function fetchOpenings() {
  return fetchPayloadCollection('openings', { limit: 1000 });
}
