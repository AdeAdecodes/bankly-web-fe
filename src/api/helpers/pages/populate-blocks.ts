import { Block, BlockType } from '~/types';
import populateNewsGrid from '../news/populate-news-grid';
import populateServiceGrid from '../services/populate-service-grid';
import populateStaffGrid from '../staff/populate-staff-grid';

type PopulateFn = (block: any) => Promise<void>;

/**
 * Blocks whose content is derived from other collections get their data
 * attached here (server-side) as `block.populatedData`, mirroring the hidden
 * `populatedData` slot the backend's PopulatableBlock reserves.
 */
const populators: Partial<Record<BlockType, PopulateFn>> = {
  'news-grid': populateNewsGrid,
  'service-grid': populateServiceGrid,
  'staff-grid': populateStaffGrid,
};

export default async function populateBlocks(blocks?: Block[] | null) {
  if (!blocks?.length) return;

  await Promise.all(
    blocks.map(async (block) => {
      const populate = populators[block.blockType];
      if (!populate) return;

      try {
        await populate(block);
      } catch (error) {
        // A failed lookup must never take the whole page down.
        // eslint-disable-next-line no-console
        console.error(`[populateBlocks] ${block.blockType} failed`, error);
      }
    })
  );
}
