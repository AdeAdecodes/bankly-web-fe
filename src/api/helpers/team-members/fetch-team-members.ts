import fetchPayloadCollection from '../shared/fetch-payload-collection';

export default function fetchTeamMembers() {
  return fetchPayloadCollection('team-members', {
    limit: 1000,
    sort: 'createdAt',
  });
}
