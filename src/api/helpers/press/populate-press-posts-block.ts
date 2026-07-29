import { BlockDef, PopulatableBlockPopulated } from '~/types';
import fetchPressPosts from './fetch-press-posts';

export default async function populatePressPostsBlock(
  block: BlockDef<'press-posts-block'>
) {
  const populated: PopulatableBlockPopulated<'press-posts-block'> =
    await fetchPressPosts({
      limit: block.latest ? block.configuration!.postCount : 12,
    });
  block.populatedData = populated;
}
