import fetchPayloadCollection from '../shared/fetch-payload-collection';

export default function fetchStaffMembers({ limit = 100 } = {}) {
  return fetchPayloadCollection('staff-members', {
    sort: 'order',
    limit,
    depth: 1,
  });
}
