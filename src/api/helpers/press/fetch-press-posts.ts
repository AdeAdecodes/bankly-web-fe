import fetchPayloadCollection from '../shared/fetch-payload-collection';

export default function fetchPressPosts(query: Record<string, any>) {
  return fetchPayloadCollection('press-posts', query);
}
