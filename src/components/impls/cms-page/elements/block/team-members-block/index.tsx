import { Typography } from '@mui/material';
import AspectRatio from '~/components/shared/aspect-ratio';
import CssGrid from '~/components/shared/css-grid';
import { Column, Row } from '~/components/shared/layout';
import parseColumns from '~/helpers/parse-columns';
import { PopulatedBlockDef, TeamMember } from '~/types';
import MediaField from '../../field/media-field';

type TeamMembersBlockProps = {
  block: PopulatedBlockDef<'team-members-block'>;
};

function TeamMembersBlock({ block }: TeamMembersBlockProps) {
  return (
    <CssGrid
      columns={parseColumns(block.columns || '4')}
      rowSpacing={3}
      columnSpacing={6}
    >
      {block.populatedData.teamMembers.map((teamMember) => (
        <TeamMemberCard key={teamMember.id} teamMember={teamMember} />
      ))}
    </CssGrid>
  );
}

type TeamMemberCardProps = {
  teamMember: TeamMember;
};

function TeamMemberCard({ teamMember }: TeamMemberCardProps) {
  return (
    <Column gap={1}>
      <AspectRatio value={0.7175} bgcolor="grey.200" borderRadius={1}>
        <MediaField media={teamMember.media} borderRadius={1} fit="cover" />
      </AspectRatio>
      <Row
        gap={2}
        mainAxisAlignment="space-between"
        crossAxisAlignment="center"
      >
        <Column>
          <Typography fontWeight={600}>{teamMember.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {teamMember.designation}
          </Typography>
        </Column>
      </Row>
    </Column>
  );
}

export default TeamMembersBlock;
