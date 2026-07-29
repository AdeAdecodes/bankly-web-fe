import fetchOnePayloadCollection from '../shared/fetch-one-payload-collection';

export default async function fetchHelpArticle(slug: string) {
  return fetchOnePayloadCollection('help-articles', {
    where: { slug: { equals: slug } },
  });
}
