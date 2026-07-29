import { BlockDef, PopulatableBlockPopulated } from '~/types';
import fetchTeamMembers from './fetch-team-members';

// eslint-disable-next-line @typescript-eslint/require-await
export default async function populateTeamMembersBlock(
  block: BlockDef<'team-members-block'>
) {
  const populated: PopulatableBlockPopulated<'team-members-block'> = {
    teamMembers: (await fetchTeamMembers()).docs,
  };
  block.populatedData = populated;
}
