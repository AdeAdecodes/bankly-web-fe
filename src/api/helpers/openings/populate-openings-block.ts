import { BlockDef, PopulatableBlockPopulated } from '~/types';
import fetchOpenings from './fetch-openings';

export default async function populateOpeningsBlock(
  block: BlockDef<'openings-block'>
) {
  const populated: PopulatableBlockPopulated<'openings-block'> = {
    openings: (await fetchOpenings()).docs,
  };

  block.populatedData = populated;
}
