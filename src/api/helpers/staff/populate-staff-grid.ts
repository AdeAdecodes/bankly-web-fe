import { PopulatedBlockDef } from '~/types';
import fetchStaffMembers from './fetch-staff-members';

export default async function populateStaffGrid(
  block: PopulatedBlockDef<'staff-grid'>
) {
  const result = await fetchStaffMembers();
  block.populatedData = { staff: result.docs };
}
