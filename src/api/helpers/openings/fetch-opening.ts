import fetchOnePayloadCollection from '../shared/fetch-one-payload-collection';

export default async function fetchOpening(id: string) {
  return fetchOnePayloadCollection('openings', { id });
}
