import fetchPayloadCollection from '../shared/fetch-payload-collection';

export default function fetchTestimonials() {
  return fetchPayloadCollection('testimonials', {
    limit: 1000,
    sort: 'createdAt',
  });
}
