import { BlockDef } from '~/types';

export default function blogBlockToCMSQuery(
  block: BlockDef<'blog-posts-block'>
): Record<string, any> {
  return {
    where: {
      type: {
        equals: block.type,
      },
    },
    limit: block.fixed ? block.postCount : 12,
    sort: '-createdAt',
  };
}
