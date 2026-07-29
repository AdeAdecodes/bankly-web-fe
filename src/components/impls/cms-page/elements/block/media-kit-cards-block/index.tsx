import { Typography } from '@mui/material';
import CssGrid from '~/components/shared/css-grid';
import { Column, Flexible } from '~/components/shared/layout';
import { BlockDef } from '~/types';
import ActionField from '../../field/action-field';
import MediaField from '../../field/media-field';

type MediaKitCardsBlockProps = {
  block: BlockDef<'media-kit-cards-block'>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MediaKitCardsBlock({ block }: MediaKitCardsBlockProps) {
  return (
    <CssGrid columns={{ xs: 2, md: 4 }} spacing={3}>
      {block.cards?.map((card) => (
        <MediaKitCard key={card.id} card={card} />
      ))}
    </CssGrid>
  );
}

type MediaKitCardDef = NonNullable<
  MediaKitCardsBlockProps['block']['cards']
>[number];

type MediaKitCardProps = {
  card: MediaKitCardDef;
};

function MediaKitCard({ card }: MediaKitCardProps) {
  return (
    <Column
      crossAxisAlignment="center"
      gap={2}
      py={4}
      px={2}
      borderRadius={2}
      bgcolor={card.color}
      sx={{
        transition: 'filter 0.25s',
        '&:hover': {
          filter:
            'drop-shadow(0px 0px 0.578947px rgba(12, 26, 75, 0.1)) drop-shadow(0px 11.5789px 13.8947px rgba(20, 37, 63, 0.06))',
        },
      }}
    >
      <MediaField media={card.media} maxHeight={88} />
      <Flexible />
      <Typography align="center" fontWeight={700}>
        {card.label}
      </Typography>
      <ActionField action={card.action} fontSize={14} />
    </Column>
  );
}

export default MediaKitCardsBlock;
