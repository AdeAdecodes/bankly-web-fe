import { ConsularService, PopulatedBlockDef } from '~/types';
import { pickServiceCard } from '../shared/slim-props';
import fetchConsularServices from './fetch-consular-services';

/** Key used to look a group's services up in `populatedData.groups`. */
export function serviceGroupKey(group: { id?: string | null }, index: number) {
  return group.id || String(index);
}

export default async function populateServiceGrid(
  block: PopulatedBlockDef<'service-grid'>
) {
  const groups: Record<string, ConsularService[]> = {};

  await Promise.all(
    (block.groups ?? []).map(async (group, index) => {
      if (group.populateBy !== 'category' || !group.category) return;

      const result = await fetchConsularServices({ category: group.category });
      groups[serviceGroupKey(group, index)] = result.docs.map(pickServiceCard);
    })
  );

  block.populatedData = { groups };
}
