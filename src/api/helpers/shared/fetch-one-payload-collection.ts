import fetchPayloadCollection from './fetch-payload-collection';

export default function fetchOnePayloadCollection(
  ...args: Parameters<typeof fetchPayloadCollection>
) {
  return fetchPayloadCollection(...args).then((x) => x.docs[0]);
}
