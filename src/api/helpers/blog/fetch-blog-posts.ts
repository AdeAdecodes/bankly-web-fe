import fetchPayloadCollection from '../shared/fetch-payload-collection';

export default async function fetchBlogPosts(query: Record<string, any>) {
  return fetchPayloadCollection('blog-posts', query);
}
