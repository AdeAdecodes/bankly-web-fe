import { BlockDef, PopulatableBlockPopulated } from '~/types';
import fetchBlogPosts from './fetch-blog-posts';
import blogBlockToCMSQuery from './helpers/blog-block-to-cms-query';

export default async function populateBlogPostsBlock(
  block: BlockDef<'blog-posts-block'>
) {
  const populated: PopulatableBlockPopulated<'blog-posts-block'> =
    await fetchBlogPosts(blogBlockToCMSQuery(block));

  block.populatedData = populated;
}
