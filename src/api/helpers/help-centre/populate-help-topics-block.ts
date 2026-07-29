import { BlockDef, PopulatableBlockPopulated } from '~/types';
import fetchHelpTopics from './fetch-help-topics';

export default async function populateHelpTopicsBlock(
  block: BlockDef<'help-topics-block'>
) {
  const populated: PopulatableBlockPopulated<'help-topics-block'> = {
    topics: (await fetchHelpTopics()).docs,
  };
  block.populatedData = populated;
}
