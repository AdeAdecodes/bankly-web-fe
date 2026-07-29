import fetchOnePayloadCollection from '../shared/fetch-one-payload-collection';

export default async function fetchCaseStudy(slug: string) {
  return fetchOnePayloadCollection('case-studies', { slug });
}
