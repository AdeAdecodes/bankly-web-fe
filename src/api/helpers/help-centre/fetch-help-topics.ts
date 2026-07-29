import fetchPayloadCollection from '../shared/fetch-payload-collection';

export default async function fetchHelpTopics() {
  return fetchPayloadCollection('help-topics', { limit: 1000 });
}
