import fetchPayloadCollection from '../shared/fetch-payload-collection';

export default function fetchCaseStudies() {
  return fetchPayloadCollection('case-studies', {
    limit: 1000,
    sort: 'createdAt',
  });
}
