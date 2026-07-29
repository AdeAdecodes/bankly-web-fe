import fetchOnePayloadCollection from '../shared/fetch-one-payload-collection';

export default async function fetchBlogPost(slug: string) {
  return fetchOnePayloadCollection('blog-posts', {
    where: { slug: { equals: slug } },
  });
}
