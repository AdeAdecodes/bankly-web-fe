import { Typography } from '@mui/material';
import Divider from '~/components/shared/divider';
import { Column, Row, Spacer } from '~/components/shared/layout';
import { Opening, PopulatedBlockDef } from '~/types';
import { timeAgo } from '~/utils/date';
import ActionField from '../../field/action-field';

type OpeningsBlockProps = {
  block: PopulatedBlockDef<'openings-block'>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function OpeningsBlock({ block }: OpeningsBlockProps) {
  return (
    <Column width={1} maxWidth={540} gap={2} mx="auto">
      {block.populatedData.openings.map((opening) => (
        <OpeningCard key={opening.id} opening={opening} />
      ))}
    </Column>
  );
}

type OpeningCardProps = {
  opening: Opening;
};

function OpeningCard({ opening }: OpeningCardProps) {
  return (
    <Row
      gap={2}
      crossAxisAlignment="center"
      bgcolor="white"
      color="text.primary"
      p={1.5}
      borderRadius={2}
    >
      <Column flex={1}>
        <Typography variant="subtitle2" color="text.secondary">
          Posted {timeAgo(opening.createdAt)}
        </Typography>
        <Typography variant="h6">{opening.title}</Typography>
        <Spacer sy={3} />
        <Row
          crossAxisAlignment="center"
          color="grey.500"
          divider={
            <Divider
              weight={3}
              width={3}
              mx={1}
              color="divider"
              borderRadius="50%"
            />
          }
        >
          <Typography variant="subtitle2" color="inherit">
            {opening.location}
          </Typography>
          <Typography variant="subtitle2" color="inherit">
            {opening.department}
          </Typography>
          {opening.remote && (
            <Typography variant="subtitle2" color="inherit">
              Remote
            </Typography>
          )}
        </Row>
      </Column>
      <ActionField
        action={{
          type: 'custom',
          label: 'Apply',
          url: `/careers/${opening.id}`,
          decoration: {
            variant: 'contained',
            color: 'primary',
          },
        }}
      />
    </Row>
  );
}

export default OpeningsBlock;
